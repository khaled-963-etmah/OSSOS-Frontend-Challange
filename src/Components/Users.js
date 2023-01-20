import { useEffect, useState } from "react";
import localApi from "../api/Data";
import UserCard from "./userCard";

export default function Users() {

//....................states....................................

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

 //..................... usseEffect ............................. 

  useEffect(() => {
    getFilteredSuggestions(searchTerm)
      .then(setSuggestions)
      .catch((error) => {
        console.log(error);
      });
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
        {suggestions.length > 0 ? (
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
              we can not foud any user with this namer
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
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
    return data.suggestions.filter((suggestion) =>
      suggestion.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
