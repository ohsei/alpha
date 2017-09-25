import styled from 'styled-components'

const Item = styled.div`
  width: 30px;
  background-color: orange;
  color:white;
  -webkit-writing-mode: ${props=>props.vertical ? 'vertical-lr' : 'horizontal-tb'};
  -ms-writing-mode:  ${props=>props.vertical ? 'tb-lr' : 'lr-tb'};
  writing-mode: ${props=>props.vertical ? 'vertical-lr' : 'horizontal-tb'};
  text-orientation:upright;
  height: 40px;
  border: 0.1px solid white;
  flex-direction:row;
  text-align: center;
`

export default Item