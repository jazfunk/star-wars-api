import React from "react";
import * as ReactBootStrap from "react-bootstrap";

const CharactersTable = (props) => {
  const renderCharacter = (character, index) => {
    if (props.characters.length > 0) {
      return (
        <tr key={index}>
          <td>{character.name}</td>
          <td>{character.birth_year}</td>
          <td>{character.height}</td>
          <td>{character.mass}</td>
          <td>{character.homeworld}</td>
          <td>{character.species}</td>
        </tr>
      );
    }
  };

  return (
    <div className="body-main-table table-responsive">
      <ReactBootStrap.Table className="table-dark table-striped table-borderless table-hover table-bg-trans text-nowrap">
        <thead className='thead-dark'>
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
