import React from "react";
import uniqid from "uniqid";
import Description from "../Description/Description.jsx";
import './StyleSkills.css'

class Skills extends React.Component {
    constructor() {
        super()
        this.formRef = React.createRef();
        this.state = {
            skill: {
                title: '',
                id: uniqid()
            },
            skillList: [{ title: `Example Skill (Click 'x' to remove me!)`, id: uniqid() }],
            displaySkillsForm: false,
            displayAddSkillButton: false,
            displayDescriptionForm: false,
            displayDeleteButton: false,
            displayDescriptionRemoveButton: false,
            displaySkillsFormWhenHover: false
        }
    }

    onChangeTitle = (e) => {
        this.setState({
            skill: {
                ...this.state.skill,
                title: e.target.value
            }
        })
    }

    onClickSave = (e) => {
        if (this.formRef.current.checkValidity()) {
            this.setState({
                skill: {
                    ...this.state.skill,
                    id: uniqid()
                },
                skillList: [...this.state.skillList, this.state.skill],
                displaySkillsForm: false,
                displaySkillsFormWhenHover: false
            })
        }
    }

    onSubmitForm = (e) => {
        e.preventDefault();
    }

    onClickDelete = (e) => {
        this.setState({
            skillList: this.state.skillList.filter(skill => skill.id !== e.target.id)
        })
    }

    onClickAddSkill = (e) => {
        this.setState({
            displaySkillsForm: !this.state.displaySkillsForm,
            displaySkillsFormWhenHover: true
        })
    }

    onClickCancel = (e) => {
        this.setState({
            displaySkillsForm: false,
            displaySkillsFormWhenHover: false
        })
    }

    onMouseOverSkillsTitle = (e) => {
        if (this.state.displaySkillsForm) {
            this.setState({ displayAddSkillButton: false })
        } else {
            this.setState({ displayAddSkillButton: true })
        }
    }

    onMouseOutSkillsTitle = (e) => {
        this.setState({ displayAddSkillButton: false })
    }

    onMouseOverComponent = (e) => {
        if (this.state.displaySkillsFormWhenHover) {
            this.setState({
                displaySkillsForm: true,
            })
        }

        this.setState({
            displayDescriptionForm: true,
            displayDeleteButton: true,
            displayDescriptionRemoveButton: true
        })
    }

    onMouseOutComponent = (e) => {
        if (this.state.displaySkillsFormWhenHover) {
            this.setState({
                displaySkillsForm: false,
            })
        }
        this.setState({
            displayDescriptionForm: false,
            displayDeleteButton: false,
            displayDescriptionRemoveButton: false
        })
    }

    render() {
        return (
            <div
                onMouseOver={this.onMouseOverComponent}
                onMouseOut={this.onMouseOutComponent}
                data-testid='Skills'
                id='Skills' >
                <p className="skills-title"
                    onMouseOver={this.onMouseOverSkillsTitle}
                    onMouseOut={this.onMouseOutSkillsTitle}
                >
                    Skills
                    <button
                        className={`add-skill-button ${this.state.displayAddSkillButton ? '' : 'hidden'}`}
                        onClick={this.onClickAddSkill} >
                        + Add Skill
                    </button>
                </p>

                <ul className="skill-list">
                    {this.state.skillList.map(skill => {
                        return (
                            <li key={skill.id} className='skill-item'>
                                <div className="skill-item-title">{skill.title}</div>
                                <button className={`delete-button ${this.state.displayDeleteButton ? '' : 'hidden'}`} onClick={this.onClickDelete} id={skill.id} >x</button>
                                <Description
                                    displayDescriptionForm={this.state.displayDescriptionForm}
                                    displayDescriptionRemoveButton={this.state.displayDescriptionRemoveButton} />
                            </li>)
                    })}
                </ul>

                <form
                    ref={this.formRef}
                    action=""
                    onSubmit={this.onSubmitForm}
                    className={`skills-form ${this.state.displaySkillsForm ? '' : 'hidden'}`}
                >
                    <label htmlFor="title-input">Title</label>
                    <input
                        autoComplete='off'
                        onChange={this.onChangeTitle}
                        type="text"
                        name="title-input"
                        id="title-input"
                        required
                    />
                    <div className="skills-buttons-wrapper">
                        <button className="save-button" onClick={this.onClickSave}>Save</button>
                        <button type="button" className="cancel-button" onClick={this.onClickCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Skills