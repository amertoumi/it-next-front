/* import React, { useState, useContext } from "react";
import { Segment, Table, Button, Icon } from "semantic-ui-react";
import { SkillsContext } from "../../ContextAPI/skills-context";

export default function SkillsTable() {
  // Subscribe to `contacts` state and access dispatch function
  const [state, dispatch] = useContext(SkillsContext);
  // Declare a local state to be used internally by this component
  const [selectedId, setSelectedId] = useState();

  const delSkill = id => {
    dispatch({
      type: "DEL_SKILL",
      payload: id
    });
  };

  const onRemoveSkill = () => {
    delSkill(selectedId);
    setSelectedId(null); // Clear selection
  };

  const rows = state.skills.map(skill => (
    <Table.Row
      key={skill.id}
      onClick={() => setSelectedId(contact.id)}
      active={skill.id === selectedId}
    >
      <Table.Cell>{skill.name}</Table.Cell>
      <Table.Cell>{skill.type}</Table.Cell>
    </Table.Row>
  ));

  return (
    <Segment>
      <Table celled striped selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{rows}</Table.Body>
        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell colSpan="4">
              <Button
                floated="right"
                icon
                labelPosition="left"
                color="red"
                size="small"
                disabled={!selectedId}
                onClick={onRemoveSkill}
              >
                <Icon name="trash" /> Remove Skill
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Segment>
  );
} */