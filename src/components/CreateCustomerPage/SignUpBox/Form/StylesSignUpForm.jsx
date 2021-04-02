import styled from 'styled-components'
import { Form } from 'antd'

const StyledFrom = styled(Form)`
    min-width: 50%;
    .ant-form-item {
        margin-bottom: 10px !important;
        
        .ant-form-item-label {
        padding: 0 !important;
        }
    }
`
export default StyledFrom