import Bill from "./Bill";
import Footer from "./Footer";
import styled from "styled-components";

const App = () => {
  return (
    <StyledApp>
      <Bill />
      <Footer />
    </StyledApp>
  );
};

const StyledApp = styled.div`
  padding: 8vh 5% 0 5%;

  @media screen and (max-width : 480px) {

    padding : 4vh 4% 0 4%;
  }


`

export default App;
