import React from "react";
import * as ReactBootStrap from "react-bootstrap";

const CharactersTable = (props) => {
  const renderCharacter = (character, index) => {
    if (props.characters.length > 0) {
      // adjust any formatting here

      return (
        <tr key={index}>
          <td className="align-middle">{character.name}</td>
          <td className="align-middle">{character.birth_year}</td>
          <td className="align-middle">{character.height}</td>
          <td className="align-middle">{character.mass}</td>
          <td className="align-middle">{character.homeworld}</td>
          <td className="align-middle">{character.species}</td>
        </tr>
      );
    }
  };

  return (
    <div>
      <ReactBootStrap.Table striped bordered hover>
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Birth Year</th>
            <th>Height</th>
            <th>Mass</th>
            <th>Homeworld</th>
            <th>Species</th>
          </tr>
        </thead>
        <tbody>{props.characters.map(renderCharacter)}</tbody>
      </ReactBootStrap.Table>
    </div>
  );
};

export default CharactersTable;
