import './Accordion.scss'

const Accordion = ({hasClose, handleClick}) => {
    return (
        <section className="accordion-container" onClick={handleClick}>
            <header className="header-styles">
                <div className='flex-center'>
                    <img src="https://uat-vbexplore.brainsightai.com/img/completed_accordin_icon.466363ec.svg" alt='CompletedIcon' />
                    <b className='margin-yaxis-5'>Completed Uploads</b>
                </div>
                <img src={`./arrow_${hasClose ? 'down' : 'up' }.svg`} alt='arrowUp' />
            </header>
        </section>
    )
}

export default Accordion;