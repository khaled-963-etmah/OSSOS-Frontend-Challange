import { useEffect, useState } from "react";
import localApi from "../api/Data";
import UserCard from "./userCard";

export default function Users() {
  //....................states....................................

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  //..................... usseEffect .............................

  useEffect(() => {
    setLoading(true);
    // you can use one of them to load data
    // just uncomment what you want to use and comment other one

    //...........................from some resource.................

    // 1- this function load data using a read API call to some resource.

    getFilteredSuggestionsFromApi(searchTerm)
      .then(setSuggestions)
      .catch((error) => {
        console.log(error);
      });

    //...........................from JSON...........................

    // 2- this function load data using a read API call to mock JSON File.

    // getFilteredSuggestions(searchTerm)
    //   .then(setSuggestions)
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, [searchTerm]);

  //..................... handlers................................

  // to handle search input changes
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  // to handle click on cards :do something
  const handleSelect = (suggestion) => {
    setSearchTerm(suggestion);
  };
  //...............................................................
  return (
    <div className="users-con">
      <input
        className="auto-complete-input"
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search"
      />
      <div className="users">
        {loading ? (
          <div className="no-users"> loading... </div>
        ) : suggestions.length > 0 ? (
          suggestions.map((suggestion, index) => {
            // if there are suggestion then,
            // we will render them to usere
            // first  highlight the matching part of the text
            // then use UserCard Component to render user data
            const searchIndex = suggestion.name
              .toLowerCase()
              .indexOf(searchTerm.toLowerCase());
            const highlighted =
              suggestion.name.slice(0, searchIndex) +
              `<span class="highlight">${suggestion.name.slice(
                searchIndex,
                searchIndex + searchTerm.length
              )}</span>` +
              suggestion.name.slice(searchIndex + searchTerm.length);
            return (
              <UserCard
                key={index}
                img={suggestion.img}
                onClick={() => handleSelect(suggestion.name)}
              >
                <h4 className="card-title">
                  <span dangerouslySetInnerHTML={{ __html: highlighted }} />
                </h4>
                <p className="card-discription">
                  {" "}
                  {"hello I'm using whatsapp"}{" "}
                </p>
              </UserCard>
            );
          })
        ) : (
          // if no suggestion
          <div className="no-users">
            <h4 className="no-users-h4">
              No user with this name could be found
            </h4>
          </div>
        )}
      </div>
    </div>
  );
  // this funnction use for fetching data from JSON file on the Same server!!
  // and return just matched suggestions
  async function getFilteredSuggestions(searchTerm) {
    const data = await localApi
      .then((data) => {
        setLoading(false);
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
    return data.suggestions.filter((suggestion) =>
      suggestion.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  // this funnction use for fetching data from some resource
  // and return just matched suggestions
  async function getFilteredSuggestionsFromApi(searchTerm) {
    const data = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "get",
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        let d = data.map((d) => {
          return {
            id: d.id,
            name: d.name,
            companyName: d.company.name,
            img: "./img/boy2.webp",
          };
        });
        setLoading(false);
        return d;
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(data);
    return data.filter((suggestion) =>
      suggestion.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
