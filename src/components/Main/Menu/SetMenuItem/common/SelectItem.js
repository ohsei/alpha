import SmallItem from './SmallItem'

const SmallItemSelect = SmallItem.withComponent('select')

const SelectItem = SmallItemSelect.extend`
  border: 1px solid white;
`

export default SelectItem