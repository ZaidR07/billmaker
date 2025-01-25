import styled from "styled-components";

const Bill = () => {
  return (
    <StyledBill>
      <h1 className="mainheading">Invoice Generator</h1>
      <section className="from-section">
        <p className="from-heading">From*</p>
        <div className="from-form" style={{display : "flex " , gap : "2vw"}}>
            <div className="input-block">
                <label htmlFor="" className="label">Company Name - </label>
                <input style={{width : "40vw"}} type="text" className="input" />
            </div>
            <div className="input-block">
                <label htmlFor=""  className="label">CIN - </label>
                <input type="text" style={{width : "25vw"}} className="input" />
            </div>
            <div className="input-block">
                <label htmlFor=""  className="label">Email - </label>
                <input type="text" style={{width : "30vw"}} className="input" />
            </div>
            <div className="input-block">
                <label htmlFor=""  className="label">Contact 1 - </label>
                <input type="text" style={{width : "15vw"}} className="input" />
            </div>
            <div className="input-block">
                <label htmlFor=""  className="label">Contact 2 - </label>
                <input type="text" style={{width : "15vw"}} className="input" />
            </div>

        </div>
      </section>
    </StyledBill>
  );
};

const StyledBill = styled.div`

    

    

  width: 100%;
  min-height: 40vh;
  /* background-color: #302F35; */
  background-color: #1c1c1e;
  border-radius: 10px;
  padding: 2%;


  .mainheading{
    color: gold ;
    text-align: center;
    background-color: #1c1c1e;
  }

  .from-section{
    padding-top: 2vh;
    background-color: #1c1c1e;

  }

  .from-heading{
    background-color: #1c1c1e;
    font-size: x-large;
    color: silver;
  }

  .from-form{
    margin-top: 5vh;
    background-color: #1c1c1e;

    display: flex;
    flex-wrap: wrap;
  }

  .input-block{
    background-color: #1c1c1e;
    display: flex;
    gap: 2vw;

  }

  .input{
    background-color: #1c1c1e;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    display: inline-block;
    outline: 0;
    color: silver;
    

  }

  .label{
    background-color: #1c1c1e;
    color: silver;
    

   
  }
`;

export default Bill;
