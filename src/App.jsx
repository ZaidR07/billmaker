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
  padding: 10vh 5% 0 5%;

`

export default App;
