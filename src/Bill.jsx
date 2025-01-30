import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { uri } from "./constant,js";

const Bill = () => {
  const [items, setItems] = useState([]); // Fixed initialization
  const [addOpen, setAddOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [enabledownload, setEnabledownload] = useState(false);

  const [itemData, setItemData] = useState({
    date: "",
    fromcompanyname: "Zaid Software Solutions",
    cin: "2543363325353",
    fromemail: "zaidstudy342@gmail.com",
    fromcontact1: "7689654563",
    fromcontact2: "7689654563",
    fromaddress: "Tulinj Road, Nallasopara East",
    tocompanyname: "Wipro Communications",
    receivingperson: "Mr John Doe",
    tocontact: "8799098765",
    toaddress: "Bangalore",
    description: "",
    qty: "",
    amount: "",
  });

  const submitdata = async () => {
    try {
      const response = await axios.post(`${uri}createpdf`, {
        payload: items,
      });
      if (response.status == 200) {
        toast.success("Pdf Generated Successfully");
        setPdfUrl(response.data.path);

        setEnabledownload(true);
      }
      resetcontrols();
    } catch {
      alert("Something went wrong");
    }
  };

  const handleItemChange = (e) => {
    setItemData({ ...itemData, [e.target.name]: e.target.value });
  };

  const addItem = () => {
    if (itemData.description && itemData.qty && itemData.amount) {
      setItems([...items, itemData]);
      setItemData({ description: "", qty: "", amount: "" });
      setAddOpen(false); // Close add item box after adding an item
    } else {
      alert("Please fill the fields that are star marked.");
    }
  };

  const resetcontrols = () => {
    setItemData({
      date: "",
      fromcompanyname: "",
      cin: "",
      fromemail: "",
      fromcontact1: "",
      fromcontact2: "",
      fromaddress: "",
      tocompanyname: "",
      receivingperson: "",
      tocontact: "",
      toaddress: "",
      description: "",
      qty: "",
      amount: "",
    });
  };

  const downloadpdf = async () => {
    try {
      const response = await axios.post(
        `${uri}downloadpdf`,
        { path: pdfUrl },
        {
          responseType: "blob", // Ensure binary data is handled correctly
        }
      );

      // Create a URL for the blob and initiate download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.pdf"); // Set a default filename
      document.body.appendChild(link);
      link.click();
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <StyledBill>
        <ToastContainer />
        <h1 className="mainheading">Invoice Generator</h1>
        <div className="input-block" style={{ marginTop: "1vh" }}>
          <label htmlFor="" className="label">
            Date -{" "}
            <span
              style={{
                backgroundColor: "#1C1C1E",
                color: "red",
                padding: "0 4px",
                fontSize: "x-large",
              }}
            >
              *
            </span>
          </label>
          <input
            style={{
              backgroundColor: "gold",
              color: "#000",
              border: "0",
              padding: "5px",
            }}
            type="date"
            className="input"
          />
        </div>
        <section className="from-section">
          <p className="from-heading">From*</p>
          <div className="from-form" style={{ display: "flex ", gap: "2vw" }}>
            <div className="input-block">
              <label htmlFor="companyName" className="label">
                Company Name -{" "}
                <span
                  style={{
                    backgroundColor: "#1C1C1E",
                    color: "red",
                    padding: "0 4px",
                    fontSize: "x-large",
                  }}
                >
                  *
                </span>
              </label>

              <input
                style={{ width: "40vw" }}
                type="text"
                className="input"
                name="fromcompanyname"
                value={itemData.fromcompanyname}
                onChange={handleItemChange}
              />
            </div>
            <div className="input-block">
              <label htmlFor="" className="label">
                CIN -{" "}
              </label>
              <input
                type="text"
                style={{ width: "27vw" }}
                className="input"
                name="cin"
                value={itemData.cin}
                onChange={handleItemChange}
              />
            </div>
            <div className="input-block">
              <label htmlFor="" className="label">
                Email -{" "}
              </label>
              <input
                type="text"
                style={{ width: "30vw" }}
                className="input"
                name="fromemail"
                value={itemData.fromemail}
                onChange={handleItemChange}
              />
            </div>
           
              <div className="input-block"  id="fromcontact">
                <label htmlFor="" className="label">
                  Contact 1 -{" "}
                  <span
                    style={{
                      backgroundColor: "#1C1C1E",
                      color: "red",
                      padding: "0 4px",
                      fontSize: "x-large",
                    }}
                  >
                    *
                  </span>
                </label>
                <input
                  type="text"
                  
                  className="input"
                  name="fromcontact1"
                  id="fromcontact1"
                  value={itemData.fromcontact1}
                  onChange={handleItemChange}
                />
              </div>
              <div className="input-block" id="fromcontact">
                <label htmlFor="" className="label">
                  Contact 2 -{" "}
                </label>
                <input
                  type="text"
                  
                  className="input"
                  name="fromcontact2"
                  id="fromcontact2"
                  value={itemData.fromcontact2}
                  onChange={handleItemChange}
                />
              </div>
            </div>
            <div className="input-block" style={{marginTop : "3vh"}} >
              <label htmlFor="" className="label">
                Address -{" "}
                <span
                  style={{
                    backgroundColor: "#1C1C1E",
                    color: "red",
                    padding: "0 4px",
                    fontSize: "x-large",
                  }}
                >
                  *
                </span>
              </label>
              <input
                type="text"
                
                className="input"
                id="fromaddress"
                name="fromaddress"
                value={itemData.fromaddress}
                onChange={handleItemChange}
              />
            </div>
          
        </section>
        <section className="to-section">
          <p className="to-heading">To*</p>
          <div className="to-form" style={{ display: "flex ", gap: "2vw" }}>
            <div className="input-block">
              <label htmlFor="" className="label">
                Company Name -{" "}
              </label>
              <input
                style={{ width: "40vw" }}
                type="text"
                className="input"
                name="tocompanyname"
                value={itemData.tocompanyname}
                onChange={handleItemChange}
              />
            </div>
            <div className="input-block">
              <label htmlFor="" className="label">
                Receiving Person -{" "}
                <span
                  style={{
                    backgroundColor: "#1C1C1E",
                    color: "red",
                    padding: "0 4px",
                    fontSize: "x-large",
                  }}
                >
                  *
                </span>
              </label>
              <input
                type="text"
                style={{ width: "20vw" }}
                className="input"
                name="receivingperson"
                value={itemData.receivingperson}
                onChange={handleItemChange}
              />
            </div>
            <div className="input-block">
              <label htmlFor="" className="label">
                Contact -{" "}
                <span
                  style={{
                    backgroundColor: "#1C1C1E",
                    color: "red",
                    padding: "0 4px",
                    fontSize: "x-large",
                  }}
                >
                  *
                </span>
              </label>
              <input
                type="text"
                style={{ width: "30vw" }}
                className="input"
                name="tocontact"
                value={itemData.tocontact}
                onChange={handleItemChange}
              />
            </div>

            <div className="input-block">
              <label htmlFor="" className="label">
                Address -{" "}
              </label>
              <input
                type="text"
                style={{ width: "40vw" }}
                className="input"
                name="toaddress"
                value={itemData.toaddress}
                onChange={handleItemChange}
              />
            </div>
          </div>
        </section>
        <button className="addbtn" onClick={() => setAddOpen(true)}>
          Add Item
        </button>

        {addOpen && (
          <div className="addbox" style={{ padding: "2%" }}>
            <label
              htmlFor="description"
              className="label"
              style={{ backgroundColor: "#302F35" }}
            >
              Product / Service Name -
            </label>
            <input
              type="text"
              className="input"
              name="description"
              value={itemData.description}
              onChange={handleItemChange}
              style={{ backgroundColor: "#302F35" }}
            />
            <label
              htmlFor="qty"
              className="label"
              style={{ backgroundColor: "#302F35", marginTop: "2vh" }}
            >
              Qty -
            </label>
            <input
              type="number"
              className="input"
              name="qty"
              value={itemData.qty}
              onChange={handleItemChange}
              style={{ backgroundColor: "#302F35" }}
            />
            <label
              htmlFor="amount"
              className="label"
              style={{ backgroundColor: "#302F35", marginTop: "2vh" }}
            >
              Amount -
            </label>
            <input
              type="number"
              className="input"
              name="amount"
              value={itemData.amount}
              onChange={handleItemChange}
              style={{ backgroundColor: "#302F35" }}
            />
            <button className="addbtn" onClick={addItem}>
              Save Item
            </button>
          </div>
        )}
      </StyledBill>

      {items.length > 0 ? (
        <div
          className="tablebox"
          style={{
            backgroundColor: "#1C1C1E",
            minHeight: "15vh",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            padding: "4vh 2% 4vh 2%",
          }}
        >
          <table
            style={{ backgroundColor: "silver", color: "#fff", width: "100%" }}
          >
            <thead>
              <tr style={{ backgroundColor: "#1C1C1E" }}>
                <th style={{ backgroundColor: "#1C1C1E", height: "8vh" }}>
                  S.no
                </th>
                <th style={{ backgroundColor: "#1C1C1E", height: "8vh" }}>
                  Description
                </th>
                <th style={{ backgroundColor: "#1C1C1E", height: "8vh" }}>
                  Qty
                </th>
                <th style={{ backgroundColor: "#1C1C1E", height: "8vh" }}>
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td
                    style={{
                      backgroundColor: "#1C1C1E",
                      height: "8vh",
                      textAlign: "center",
                    }}
                  >
                    {index + 1}
                  </td>
                  <td
                    style={{
                      backgroundColor: "#1C1C1E",
                      height: "8vh",
                      textAlign: "center",
                    }}
                  >
                    {item.description}
                  </td>
                  <td
                    style={{
                      backgroundColor: "#1C1C1E",
                      height: "8vh",
                      textAlign: "center",
                    }}
                  >
                    {item.qty}
                  </td>
                  <td
                    style={{
                      backgroundColor: "#1C1C1E",
                      height: "8vh",
                      textAlign: "center",
                    }}
                  >
                    {item.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div
          className="tablebox"
          style={{
            backgroundColor: "#1C1C1E",
            minHeight: "15vh",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
          }}
        >
          No Products Added
        </div>
      )}
      <div style={{ display: "flex", gap: "4vw", justifyContent: "center" }}>
        <button
          style={{
            backgroundColor: "gold",
            padding: "1% 2% 1% 2%",
            borderRadius: "10px",
            marginTop: "4vh",
            // marginLeft: "45%",
          }}
          onClick={submitdata}
        >
          Generate
        </button>
        {enabledownload && (
          <button
            style={{
              backgroundColor: "gold",
              padding: "1% 2% 1% 2%",
              borderRadius: "10px",
              marginTop: "4vh",
              // marginLeft: "45%",
            }}
            onClick={downloadpdf}
          >
            Download
          </button>
        )}
      </div>
    </>
  );
};

const StyledBill = styled.div`
  width: 100%;
  min-height: 10vh;

  background-color: #1c1c1e;
  border-radius: 10px;
  padding: 2%;
  padding-top: 1.5vh;
  margin-bottom: 10vh;

  .mainheading {
    color: gold;
    text-align: center;
    background-color: #1c1c1e;
  }

  .from-section {
    padding-top: 2vh;
    background-color: #1c1c1e;
  }

  .from-heading {
    background-color: #1c1c1e;
    font-size: x-large;
    color: silver;
  }

  .from-form {
    margin-top: 5vh;
    background-color: #1c1c1e;

    display: flex;
    flex-wrap: wrap;
  }

  .input-block {
    background-color: #1c1c1e;
    display: flex;
    gap: 2vw;
  }

  .input {
    background-color: #1c1c1e;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    display: inline-block;
    outline: 0;
    color: silver;
  }

  .label {
    background-color: #1c1c1e;
    color: silver;
  }

  .to-section {
    padding-top: 5vh;
    background-color: #1c1c1e;
  }

  .to-heading {
    background-color: #1c1c1e;
    font-size: x-large;
    color: silver;
  }

  .to-form {
    margin-top: 5vh;
    background-color: #1c1c1e;

    display: flex;
    flex-wrap: wrap;
  }

  .addbtn {
    background-color: gold;
    padding: 1vh 2% 1vh 2%;
    border-radius: 10px;
    margin-top: 5vh;
  }

  .addbox {
    background-color: #302f35;
    position: absolute;
    top: 40vh;
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    margin-left: 25%;
    min-width: 40%;
  }

  

  #fromcontact{
    height: 5vh;
    display: flex;
      align-items: center;

  }

  #fromaddress{
      width: 78vw;
    }

  #fromcontact1{
    width: 15vw;
  }

  #fromcontact2{
    width: 15vw;
  }

  @media screen and (max-width: 480px) {
    padding: 2% 3% 4% 3%;
    margin-bottom: 5vh;

    .mainheading {
      font-size: larger;
      margin-bottom: 2vh;
    }

    .from-heading {
      font-size: larger;
      margin-bottom: 2vh;

    }

    .from-form {
      margin-top: -0.5vh;
    }

    .input-block {
      font-size: small;
    }

    .input {
      font-size: x-small;
    }

    #fromaddress{
      width: 60vw;
    }

    #fromcontact1{
    width: 20vw;
  }

  #fromcontact2{
    width: 20vw;
  }

    
  }
`;

export default Bill;
