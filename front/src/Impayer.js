import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import "./App.css";
import { RadioGroup, RadioButton } from "react-radio-buttons";
import { load } from "./actions/action";
import { toast } from "react-toastify";

import DataGrid, {
  Column,
  Summary,
  GroupPanel,
  Grouping,
  SortByGroupSummaryInfo,
  Paging,
  SearchPanel,
  TotalItem,
  Toolbar,
  Item,
  Selection,
  Export,
  Editing,
} from "devextreme-react/data-grid";
import { jsPDF } from "jspdf";
import { exportDataGrid } from "devextreme/pdf_exporter";
import { Button } from "devextreme-react/button";
import { companies } from "./data.js";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Select from "react-select";
import CheckBox from "devextreme-react/check-box";

import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

import axios from "axios";
const exportFormats = ["pdf"];

export default function Impayer() {
  const [datas, setDatas] = useState([]);
  const [selectedItemKeys, SetselectedItemKeys] = useState([]);
  const [selectedItem, SetselectedItem] = useState([]);
  const [Visible, SetVisible] = useState(true);
  const [somme, Setsomme] = useState(0);
  const [observation, setObservation] = useState("");

  const [autoExpandAll, setAutoExpandAll] = useState(true);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const handleClose2 = () => setOpen2(false);
  const [client, setClient] = useState("");
  const [data, setData] = useState([]);
  const [userid, setUserId] = useState("");

  const [datafil, setDataFil] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dataClient = {
    nom: client,
  };
  const [post, setUser] = useState({
    nom: userid,
    intitule: "",
    type: "",
    nremise: "",
    montant: "",
    verser: "",
    dateretour: "",
    dateecheance: "",
    observation: "",
    reglement: "",
  });
  console.log(post);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...post,
      [name]: value,
    });
  };
  const handleRadio1 = (value) => {
    setUser({
      ...post,
      type: value,
    });
  };
  const handleRadio3 = (value) => {
    setUser({
      ...post,
      reglement: value,
    });
  };
  const onAutoExpandAllChanged = () => {
    setAutoExpandAll(!autoExpandAll);
  };

  useEffect( () => {
     axios.get("http://localhost:5000/client").then((res) => {
      setDatas(res.data);
    });
     axios.get("http://localhost:5000/somme").then((res) => {
      Setsomme(res.data[0].somme);
    });
  }, []);

  const saveSortie = () => {
    axios.post("http://localhost:5000/client", dataClient).then(async (res) => {
      await setOpen1(false);
    });
  };

  //stock the clients in select

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/client", post).then(() => {
      toast.success("Success: Vous avez ajouter Le Client!!.");
      setOpen2(false);
    });
  };
  const selOptions = [];
  const ids = datas.map((o) => o.nom);
  const filtered = datas.filter(
    ({ nom }, index) => !ids.includes(nom, index + 1)
  );

  for (var i = 0; i < filtered.length; i++) {
    var obj = {};
    if (filtered.length > 0) {
      obj["id"] = filtered[i].id;
      obj["nom"] = filtered[i].nom;
      obj["value"] = filtered[i].nom;
      obj["label"] = filtered[i].nom;
    }
    selOptions.push(obj);
    console.log(selOptions);
  }

  const handleOption = (e) => {
    setUser({
      ...post,
      nom: e.nom,
    });
    setUserId(e.nom);
  };
  const style = {
    position: "absolute",
    display: "flex",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    padding: 20,
    height: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  const style1 = {
    position: "absolute",
    display: "block",
    top: "64%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    padding: 20,
    height: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };
  console.log(datas);
  const onExporting = React.useCallback((e) => {
    setTimeout(() => {
      const newItems = datas.filter((item) => item.intitule !== null);
      setDatas(newItems);
      SetVisible(false);
    }, "2000");

    setTimeout(() => {
      const doc = new jsPDF();

      exportDataGrid({
        jsPDFDocument: doc,
        component: e.component,
        columnWidths: [35, 15, 25, 20, 20],
        customizeCell({ gridCell, pdfCell }) {
          if (
            gridCell.rowType === "data" &&
            gridCell.column.dataField === "Phone"
          ) {
            pdfCell.text = pdfCell.text.replace(
              /(\d{3})(\d{3})(\d{4})/,
              "($1) $2-$3"
            );
          } else if (gridCell.rowType === "group") {
            pdfCell.backgroundColor = "#BEDFE6";
          } else if (gridCell.rowType === "totalFooter") {
            pdfCell.font.style = "italic";
          }
        },
        customDrawCell(options) {
          const { gridCell, pdfCell } = options;

          if (
            gridCell.rowType === "data" &&
            gridCell.column.dataField === "Website"
          ) {
            options.cancel = true;
            doc.setFontSize(11);
            doc.setTextColor("#0000FF");

            const textHeight = doc.getTextDimensions(pdfCell.text).h;
            doc.textWithLink(
              "website",
              options.rect.x + pdfCell.padding.left,
              options.rect.y + options.rect.h / 2 + textHeight / 2,
              { url: pdfCell.text }
            );
          }
        },
      }).then(() => {
        doc.save("Companies.pdf");
      });
    }, "8000");
  });

  const renderGridCell = React.useCallback(
    (data) => (
      <a href={data.text} target="_blank" rel="noopener noreferrer">
        Website
      </a>
    ),
    []
  );

  const phoneNumberFormat = React.useCallback((value) => {
    const USNumber = value.match(/(\d{3})(\d{3})(\d{4})/);
    return `(${USNumber[1]}) ${USNumber[2]}-${USNumber[3]}`;
  }, []);
  function selectionChanged(data) {
    SetselectedItem(data.selectedRowsData);
    SetselectedItemKeys(data.selectedRowKeys);
  }
  function deleteRecords() {
    selectedItemKeys.forEach((key) => {
      axios.delete(`http://localhost:5000/client/${key}`).then((res) => {
        console.log(res.data);
      });
    });
  }
  function updateRecords() {
    dispatch(load(selectedItem[0]));
    navigate("/changer");
    /*selectedItemKeys.forEach((key) => {
      axios
        .put(`http://localhost:5000/client/${key}`, selectedItem[0])
        .then((res) => {
          console.log(res.data);
        });
    });*/
  }
  return (
    <div>
      <DataGrid
        id="gridContainer"
        dataSource={datas}
        keyExpr="id"
        selectedRowKeys={selectedItemKeys}
        onSelectionChanged={selectionChanged}
        showBorders={true}
        onExporting={onExporting}
      >
        <Selection mode="single" />
        <Paging defaultPageSize={200} />
        <SearchPanel visible={true} />

        <Export enabled={true} formats={exportFormats} />
        <GroupPanel visible={true} />
        <Grouping autoExpandAll={true} />
        <SortByGroupSummaryInfo summaryItem="count" />

        <Column dataField="nom" width={190} groupIndex={0} />
        <Column dataField="intitule" width={190} />
        <Column dataField="type" width={70} />
        <Column dataField="nremise" width={130} />
        <Column dataField="montant" width={190} />
        <Column dataField="verser" width={190} />
        <Column dataField="reste" width={130}  />
        <Column dataField="dateretour" dataType="date" width={130} />
        <Column dataField="dateecheance" dataType="date" width={130} />
        <Column dataField="observation" width={400} visible={Visible}/>
      </DataGrid>
      <Button
        stylingMode="outlined"
        type="success"
        icon="edit"
        text="edit"
        onClick={updateRecords}
      />
      <Button
        onClick={deleteRecords}
        icon="trash"
        stylingMode="outlined"
        type="success"
        disabled={!selectedItemKeys.length}
        text="Delete Selected Records"
      />

      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            id="outlined-basic"
            label="Client"
            variant="outlined"
            onChange={(event) => {
              setClient(event.target.value);
            }}
          />

          <Button
            stylingMode="outlined"
            type="success"
            variant="outlined"
            color="error"
            onClick={() => saveSortie()}
          >
            Save
          </Button>
        </Box>
      </Modal>

      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style1}>
          <form className="login" onSubmit={submitHandler}>
            <div>
              <label>Type:</label>
              <RadioGroup onChange={handleRadio1} horizontal>
                <RadioButton value="CHQ">CHQ</RadioButton>
                <RadioButton value="LCN">LCN</RadioButton>
              </RadioGroup>
            </div>
            <div>
              <label>N Cheque/LCN:</label>
              <input
                type="text"
                name="nremise"
                placeholder="Numero De Cheque..."
                value={post.nremise}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Intitule:</label>
              <input
                type="text"
                name="intitule"
                placeholder="Nom..."
                value={post.intitule}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Montant:</label>
              <input
                type="text"
                name="montant"
                placeholder="Montant..."
                value={post.montant}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Versement:</label>
              <input
                type="text"
                name="verser"
                placeholder="Versement..."
                value={post.verser}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Date De Reception De Cheque:</label>
              <input
                type="date"
                value={post.dateretour}
                onChange={handleChange}
                placeholder="Date Retour ..."
                name="dateretour"
              />
            </div>
            <div>
              <label>Date D'Echeance:</label>
              <input
                type="date"
                value={post.dateecheance}
                onChange={handleChange}
                placeholder="Date Echeance ..."
                name="dateecheance"
              />
            </div>
            <div style={{ display: "flex" }}>
              <Select
                className="selOptions"
                options={selOptions}
                onChange={handleOption}
                isSearchable={true}
              />
              <div>
              <span>observation</span>
              <textarea
                cols="70"
                rows="5"
                value={post.observation}
                name="observation"
                onChange={handleChange}
              ></textarea>
              </div>
             
            </div>

            <div>
              <label>Regler/Verser:</label>
              <RadioGroup onChange={handleRadio3} horizontal>
                <RadioButton value="regler">Regler</RadioButton>
                <RadioButton value="verser">Verser</RadioButton>
              </RadioGroup>
            </div>
            <button type="submit" className="btn">
              Enregistrer
            </button>
          </form>
        </Box>
      </Modal>
      <div>
        <Button
          stylingMode="contained"
          type="danger"
          onClick={() => setOpen1(true)}
          width="100px"
          marginLeft="200px"
        >
          Add Client
        </Button>

        <Button
          type="default"
          stylingMode="contained"
          onClick={() => setOpen2(true)}
        >
          Affect New Line To User
        </Button>
        <span>La somme des restes: {somme}</span>
      </div>
    </div>
  );
}
