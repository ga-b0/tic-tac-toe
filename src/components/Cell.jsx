export function Cell({children, updateBoard, index, isSelected}){
    

    const className = `cell ${isSelected ? 'is-selected' : ''}`
    
    const handleClick = () => {
        updateBoard(index)
    }


    return(
        <div onClick={handleClick} className={className}>{children}</div>
    )
}