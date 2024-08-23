import './Accordion.scss'

const Accordion = () => {
    return (
        <section className="accordion-container">
            <header className="header-styles">
                <div style={{display:'flex'}}>
                    <img src="https://uat-vbexplore.brainsightai.com/img/completed_accordin_icon.466363ec.svg" alt='CompletedIcon' />
                    <p style={{margin:"0px 5px"}}>CompletedUploads</p>
                </div>
                <img src="./arrow_down.svg" alt='CompletedIcon' />
            </header>
            <body>

            </body>
        </section>
    )
}

export default Accordion;