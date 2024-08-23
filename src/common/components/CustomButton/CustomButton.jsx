import './CustomButton.scss'

const CustomButton = ({title}) => {
    return(
        <button className='custom-button-container'>
            {title}
        </button>
    )
}

export default CustomButton;