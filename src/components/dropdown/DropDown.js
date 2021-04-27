import '../../styles/dropdown.css'

const DropDown = ({list, handleDropdownChange, id}) => {

  return (
  	<select className="dropdown" aria-label={id} id={id} onChange={handleDropdownChange}>
  		{list.map((data, index)=>(
        <option key={index} value={data}>{data}</option>
      ))}
    </select>
  )
}

export default DropDown;