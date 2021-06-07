import skillData from '../data/skills.json'

const Skills = () => {
    return (
        <>
            <main>
                <h1>My Skills</h1>

                <div>
                    {skillData.map(skill => <figure>
                        <img src={skill.skillIcon} alt={skill.skillName} />
                        <figcaption>
                            <span
                                style={{
                                    width: `${skill.skill}%`,
                                    background: `${skill.skillColor}`,
                                    color: `black`
                                }}
                            >{skill.skill}%</span>
                        </figcaption>
                    </figure>)}
                </div>
            </main>
            <style jsx>{`
            main {
                height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center
            }
            figure {
                display: flex;
            }
            figcaption {
                width: 300px
            }
            figcaption span {
                display: block;
                transition: width 1s;
                font-size: .8rem;
                text-align: center;
            }
            `}</style>
        </>
    );
}

export default Skills;