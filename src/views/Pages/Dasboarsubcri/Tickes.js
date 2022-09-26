import React from "react";

// react-bootstrap components
import {
  Button
} from "react-bootstrap";

// core components
import ReactTable from "components/ReactTable/ReactTable.js";

const dataTable = [
  ["Tiger Nixon", "System Architect", "Edinburgh", "61"],
  ["Garrett Winters", "Accountant", "Tokyo", "63"],
  ["Ashton Cox", "Junior Technical Author", "San Francisco", "66"],
  ["Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "22"],
  ["Airi Satou", "Accountant", "Tokyo", "33"],
  ["Brielle Williamson", "Integration Specialist", "New York", "61"],
  ["Herrod Chandler", "Sales Assistant", "San Francisco", "59"],
  ["Rhona Davidson", "Integration Specialist", "Tokyo", "55"],
  ["Colleen Hurst", "Javascript Developer", "San Francisco", "39"],
  ["Sonya Frost", "Software Engineer", "Edinburgh", "23"],
  ["Jena Gaines", "Office Manager", "London", "30"],
  ["Quinn Flynn", "Support Lead", "Edinburgh", "22"],
  ["Charde Marshall", "Regional Director", "San Francisco", "36"],
  ["Haley Kennedy", "Senior Marketing Designer", "London", "43"],
  ["Tatyana Fitzpatrick", "Regional Director", "London", "19"],
  ["Michael Silva", "Marketing Designer", "London", "66"],
  ["Paul Byrd", "Chief Financial Officer (CFO)", "New York", "64"],
  ["Gloria Little", "Systems Administrator", "New York", "59"],
  ["Bradley Greer", "Software Engineer", "London", "41"],
  ["Dai Rios", "Personnel Lead", "Edinburgh", "35"],
  ["Jenette Caldwell", "Development Lead", "New York", "30"],
  ["Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "40"],
  ["Caesar Vance", "Pre-Sales Support", "New York", "21"],
  ["Doris Wilder", "Sales Assistant", "Sidney", "23"],
  ["Angelica Ramos", "Chief Executive Officer (CEO)", "London", "47"],
  ["Gavin Joyce", "Developer", "Edinburgh", "42"],
  ["Jennifer Chang", "Regional Director", "Singapore", "28"],
  ["Brenden Wagner", "Software Engineer", "San Francisco", "28"],
  ["Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "48"],
  ["Shou Itou", "Regional Marketing", "Tokyo", "20"],
  ["Michelle House", "Integration Specialist", "Sidney", "37"],
  ["Suki Burks", "Developer", "London", "53"],
  ["Prescott Bartlett", "Technical Author", "London", "27"],
  ["Gavin Cortez", "Team Leader", "San Francisco", "22"],
  ["Martena Mccray", "Post-Sales support", "Edinburgh", "46"],
  ["Unity Butler", "Marketing Designer", "San Francisco", "47"],
  ["Howard Hatfield", "Office Manager", "San Francisco", "51"],
  ["Hope Fuentes", "Secretary", "San Francisco", "41"],
  ["Vivian Harrell", "Financial Controller", "San Francisco", "62"],
  ["Timothy Mooney", "Office Manager", "London", "37"],
  ["Jackson Bradshaw", "Director", "New York", "65"],
];

function Example() {
  const [data, setData] = React.useState(
    dataTable.map((prop, key) => {
      return {
        id: key,
        name: prop[0],
        position: prop[1],
        office: prop[2],
        age: prop[3],
        count:prop[3],
        actions: (
          // we've added some custom button actions
          <div className="container actions-right pl-2">
            {/* use this button to add a like kind of action */}
            
            {/* use this button to add a edit kind of action */}
            <Button
              onClick={() => {
                let obj = data.find((o) => o.id === key);
                alert(
                  "You've clicked EDIT button on Name: " +obj.name + ", position: " +
                    obj.position +", office: " +  
                     obj.office +", age: " +
                     obj.age + "}."
                );
              }}
              variant="warning"
              size="sm"
              className="text-warning btn-link edit"
            >
              <i className="fa fa-edit" />
            </Button>{" "}
            {/* use this button to remove the data row */}
            <Button
              onClick={() => {
                var newData = data;
                newData.find((o, i) => {
                  if (o.id === key) {
                    // here you should add some custom code so you can delete the data
                    // from this component and from your server as well
                    newData.splice(i, 1);
                    return true;
                  }
                  return false;
                });
                setData([...newData]);
              }}
              variant="danger"
              size="sm"
              className="btn-link remove text-danger"
            >
              <i className="fa fa-times" />
            </Button>{" "}
            <Button
              onClick={() => {
                let obj = data.find((o) => o.id === key);
                alert(
                  "You've clicked LIKE button on { Name: " +
                    obj.name +  ", position: " +
                     obj.position + ", office: " +
                    obj.office +", age: " +
                     obj.age +
                    "}."
                );
              }}
              variant="info"
              size="sm"
              className="text-info btn-link like"
            >
              <i className="fa fa-heart" />
            </Button>{" "}
          </div>
        ),
      };
    })
  );
  return (
    <>
    <ReactTable
      data={data}
      columns={[
        {
          Header: "Concierto",
          accessor: "name",
          isVisible: true,
        },
        {
          Header: "Lugar",
          accessor: "position",
          isVisible: true,
        },
        {
          Header: "Fecha",
          accessor: "office",
          isVisible: true,
        },
        {
          Header: "Hora",
          accessor: "age",
          isVisible: true
          
        },
        {
          Header: "Cantidad",
          accessor: "count",
          isVisible: true
          
        },
        {
          Header: "Acciones",
          accessor: "actions",
          isVisible: true,
          sortable: false,
          filterable: false,
        },
      ]}     
      
      
      
      /*
        You can choose between primary-pagination, info-pagination, success-pagination, warning-pagination, danger-pagination or none - which will make the pagination buttons gray
      */
      className="-striped -highlight success-pagination"
    />
    </>
  );
}

export default Example;