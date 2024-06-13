import styled from "styled-components";

const PStyled = styled.p`
    font-size: 70px;
    font-weight: 500;
`;

function Title(props) {
    return <PStyled>{props.text}</PStyled>
}

export default Title