import React, { useState, useEffect, useRef, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
//import { CustomerService } from './service/freelancerService';
import { Dropdown } from "primereact/dropdown";
import { ProgressBar } from "primereact/progressbar";
import { Calendar } from "primereact/calendar";
import { MultiSelect } from "primereact/multiselect";
import { Context as SkillsContext } from "../../Context/Skills/SkillsContext";
import { TextField, Button } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Col } from "reactstrap";
import "./freelancerFilter.css";

const DataTableFilterDemo = () => {
  const { state, FETCH_SKILLS, FETCH_PROFIL_BY_SKILLS} = useContext(SkillsContext);
  const [listSkills, setListSkills] = useState([]);
  const [skillSearch, setMySkills] = React.useState([]);
  const [customers, setCustomers] = useState(null);
  const [selectedRepresentative, setSelectedRepresentative] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const dt = useRef(null);
  const representatives = [
    { name: "Amy Elsner", image: "amyelsner.png" },
    { name: "Anna Fali", image: "annafali.png" },
    { name: "Asiya Javayant", image: "asiyajavayant.png" },
    { name: "Bernardo Dominic", image: "bernardodominic.png" },
    { name: "Elwin Sharvill", image: "elwinsharvill.png" },
    { name: "Ioni Bowcher", image: "ionibowcher.png" },
    { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
    { name: "Onyama Limba", image: "onyamalimba.png" },
    { name: "Stephen Shaw", image: "stephenshaw.png" },
    { name: "XuXue Feng", image: "xuxuefeng.png" },
  ];

  const statuses = [
    "unqualified",
    "qualified",
    "new",
    "negotiation",
    "renewal",
    "proposal",
  ];

  //const customerService = new CustomerService();

  //useEffect(() => {
  //    customerService.getCustomersLarge().then(data => setCustomers(data));
  //}, []); // eslint-disable-line react-hooks/exhaustive-deps

  // get list of skills
  React.useEffect(() => {
    FETCH_SKILLS();
  }, []);
  const skill = state.skills;
 
  console.log(state.profils)

  const filterDate = (value, filter) => {
    if (
      filter === undefined ||
      filter === null ||
      (typeof filter === "string" && filter.trim() === "")
    ) {
      return true;
    }

    if (value === undefined || value === null) {
      return false;
    }

    return value === formatDate(filter);
  };

  const formatDate = (date) => {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = "0" + month;
    }

    if (day < 10) {
      day = "0" + day;
    }

    return date.getFullYear() + "-" + month + "-" + day;
  };

  const onRepresentativesChange = (e) => {
    dt.current.filter(e.value, "representative.name", "in");
    setSelectedRepresentative(e.value);
  };

  const onDateChange = (e) => {
    dt.current.filter(e.value, "date", "custom");
    setSelectedDate(e.value);
  };

  const onStatusChange = (e) => {
    dt.current.filter(e.value, "status", "equals");
    setSelectedStatus(e.value);
  };


    const  pfs = state.profils
    function nameBodyTemplate () {
      console.log(pfs);
      pfs.map((profil, key)=> {
      return (
        <React.Fragment>
          <span className="p-column-title">Name</span>
          {console.log(profil.name)}
        </React.Fragment>
        
      );
      
      });
  
    }

  const countryBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Country</span>
        <img
          alt="flag"
          src="showcase/demo/images/flag_placeholder.png"
          onError={(e) =>
            (e.target.src =
              "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
          }
          className={`flag flag-${rowData.country.code}`}
          width={30}
        />
        <span className="image-text">{rowData.country.name}</span>
      </React.Fragment>
    );
  };

  const representativeBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Representative</span>
        <img
          alt={rowData.representative.name}
          src={`showcase/demo/images/avatar/${rowData.representative.image}`}
          onError={(e) =>
            (e.target.src =
              "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
          }
          width={32}
          style={{ verticalAlign: "middle" }}
        />
        <span className="image-text">{rowData.representative.name}</span>
      </React.Fragment>
    );
  };

  const dateBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Date</span>
        <span>{rowData.date}</span>
      </React.Fragment>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Status</span>
        <span className={`customer-badge status-${rowData.status}`}>
          {rowData.status}
        </span>
      </React.Fragment>
    );
  };

  const activityBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Activity</span>
        <ProgressBar value={rowData.activity} showValue={false} />
      </React.Fragment>
    );
  };

  const representativesItemTemplate = (option) => {
    return (
      <div className="p-multiselect-representative-option">
        <img
          alt={option.name}
          src={`showcase/demo/images/avatar/${option.image}`}
          onError={(e) =>
            (e.target.src =
              "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
          }
          width={32}
          style={{ verticalAlign: "middle" }}
        />
        <span className="image-text">{option.name}</span>
      </div>
    );
  };

  const statusItemTemplate = (option) => {
    return <span className={`customer-badge status-${option}`}>{option}</span>;
  };

  const header = (
    <div className="table-header">
      List of Customers
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Global Search"
        />
      </span>
    </div>
  );

  const representativeFilter = (
    <MultiSelect
      value={selectedRepresentative}
      options={representatives}
      itemTemplate={representativesItemTemplate}
      onChange={onRepresentativesChange}
      optionLabel="name"
      optionValue="name"
      placeholder="All"
      className="p-column-filter"
    />
  );
  const dateFilter = (
    <Calendar
      value={selectedDate}
      onChange={onDateChange}
      dateFormat="yy-mm-dd"
      className="p-column-filter"
      placeholder="Registration Date"
    />
  );
  const statusFilter = (
    <Dropdown
      value={selectedStatus}
      options={statuses}
      onChange={onStatusChange}
      itemTemplate={statusItemTemplate}
      placeholder="Select a Status"
      className="p-column-filter"
      showClear
    />
  );

  return (
    <React.Fragment>
      <div className="mt-5 mb-3">
        <h4>Select freelancer from table:</h4>
      </div>
      <div className="mb-4">
        <h6>Type Freelancer skills</h6>
      </div>
      <div className="d-flex flex-column justify-content-lg-around mb-3">
        <div>
          <Autocomplete
            
            multiple
            id="sk"
            size="small"
            options={skill?.map((option) => option.name)}
            onChange={(event, newValue) => {
              setMySkills([
                ...skillSearch,
                ...newValue.filter((option) => skillSearch.indexOf(option) === -1),
              ]);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                id="skillSearch"
                label="Type Searched skills here"
                placeholder="Favorites"
                value={skillSearch}
              />
            )}
            style={{ width: "450px" }}
          />
        </div>
        <div>
        <Button 
            variant="contained" 
            color="primary" 
            className="mt-3"
            onClick={()=>{FETCH_PROFIL_BY_SKILLS(skillSearch)}}
            >
            Search
            </Button>
        </div>
      </div>
      <div className="datatable-filter-demo mb-5">
        <div className="card">
          <DataTable
            ref={dt}
            value={customers}
            paginator
            rows={10}
            header={header}
            className="p-datatable-customers"
            globalFilter={globalFilter}
            emptyMessage="No Inspirnaute found."
          >
            {console.log(nameBodyTemplate)}
            <Column
              field="name"
              header="Name"
              body={nameBodyTemplate}
              filter
              filterPlaceholder="Search by name"
            />
            <Column
              field="country"
              filterField="country.name"
              header="Country"
              body={countryBodyTemplate}
              filter
              filterPlaceholder="Search by country"
              filterMatchMode="contains"
            />
            <Column
              field="representative.name"
              header="Representative"
              body={representativeBodyTemplate}
              filter
              filterElement={representativeFilter}
            />
            <Column
              field="date"
              header="Date"
              body={dateBodyTemplate}
              filter
              filterElement={dateFilter}
              filterFunction={filterDate}
            />
            <Column
              field="status"
              header="Status"
              body={statusBodyTemplate}
              filter
              filterElement={statusFilter}
            />
            <Column
              field="activity"
              header="Activity"
              body={activityBodyTemplate}
              filter
              filterPlaceholder="Minimum"
              filterMatchMode="gte"
            />
          </DataTable>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DataTableFilterDemo;
