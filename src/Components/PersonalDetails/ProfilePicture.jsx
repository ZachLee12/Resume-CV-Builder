import React from "react";
import PlaceholderImage from '../../assets/images/man.png'
import Interactable from "../Interactable/Interactable.jsx";
import interact from "interactjs";

function dragMoveListener(event) {
    let target = event.target
    // keep the dragged position in the data-x/data-y attributes
    let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    // translate the element
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
}

const draggableOptions = {
    modifiers: [
        interact.modifiers.restrictRect({
            restriction: "parent"
        })
    ],
    listeners: {
        move: dragMoveListener
    },
    autoScroll: false, //disable autoScroll
};

const resizableOptions = {
    edges: { top: true, left: true, bottom: true, right: true },
    listeners: {
        move: function (event) {
            let { x, y } = event.target.dataset

            x = (parseFloat(x) || 0) + event.deltaRect.left
            y = (parseFloat(y) || 0) + event.deltaRect.top

            Object.assign(event.target.style, {
                width: `${event.rect.width}px`,
                height: `${event.rect.height}px`,
                transform: `translate(${x}px, ${y}px)`
            })

            Object.assign(event.target.dataset, { x, y })
        }
    },
    modifiers: [
        interact.modifiers.restrictSize({
            min: { width: 50, height: 50 },
            max: { width: 200, height: 300 },
            endOnly: false
        }),
        interact.modifiers.restrictEdges({ //restrictRect() won't work!
            outer: 'parent'
        }),
        interact.modifiers.aspectRatio({
            ratio: 'preserve'
        })
    ]
}

class ProfilePicture extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imageBase64: '',
            displayFileInput: false
        }
    }

    onChangeInput = async (e) => {
        //await Promise to resolve first,
        const base64 = await this.#getImageBase64(e.target.files[0])
        //then only call this.setState()
        if (typeof base64 === typeof 'string comparison') {
            this.setState({
                imageBase64: base64
            })
        }
    }

    #getImageBase64 = async (file) => {
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onloadend = function () {
                resolve(reader.result) //base64
            }
        }).catch(err => console.log('No file was uploaded, or it was not an image.'))
    }

    onMouseOverComponent = (e) => {
        this.setState({
            displayFileInput: true
        })
    }

    onMouseOutComponent = (e) => {
        this.setState({
            displayFileInput: false
        })
    }

    render() {
        return (
            <div
                onMouseOver={this.onMouseOverComponent}
                onMouseOut={this.onMouseOutComponent}
                data-testid='ProfilePicture'
                id="ProfilePicture">
                <Interactable draggable={true} draggableOptions={draggableOptions} resizable={true} resizableOptions={resizableOptions}>
                    <img className="profile-picture" src={this.state.imageBase64 === '' ? PlaceholderImage : this.state.imageBase64} alt="profile" />
                </Interactable>


                <div data-testid='file-input-wrapper' className={`file-input-wrapper ${this.state.displayFileInput ? '' : 'hidden'}`}>
                    <p className="upload-input-label-and-wrapper">Upload a profile picture.</p>
                    <p className="profile-picture-function-title">*You can resize your picture and also drag it around!</p>
                    <input
                        value=''
                        className="file-input"
                        onChange={this.onChangeInput}
                        type="file" id="myFile" name="filename" accept="image/png, image/gif, image/jpeg, image/webp, image/jpg" />
                </div>
            </div>
        )
    }
}

export default ProfilePicture
