import React, { useState } from "react";
import { Ticket } from "@/pages/types";
import { RiEdit2Line, RiDeleteBinLine, RiCheckLine, RiUserSettingsLine } from "react-icons/ri";

export interface TicketActionsProps {
  onUpdateTitle: (ticketId: number, newTitle: string) => void;
  onUpdateDescription: (ticketId: number, newDescription: string) => void;
  onDeleteTicket: (ticketId: number) => void;
  onResolveTicket: (ticketId: number) => void;
  onDelegateTicket: (ticketId: number, assignedTo: string) => void;
  ticket: Ticket | null;
}

const TicketActions: React.FC<TicketActionsProps> = ({
  onUpdateTitle,
  onUpdateDescription,
  onDeleteTicket,
  onResolveTicket,
  onDelegateTicket,
  ticket,
}) => {
  const [editing, setEditing] = useState(false);
  const [delegating, setDelegating] = useState(false);
  const [newTitle, setNewTitle] = useState(ticket ? ticket.title : "");
  const [newDescription, setNewDescription] = useState(ticket ? ticket.description : "");
  const [assignedTo, setAssignedTo] = useState("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewDescription(event.target.value);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    if (ticket) {
      onUpdateTitle(ticket.id, newTitle);
      onUpdateDescription(ticket.id, newDescription);
      setEditing(false);
    }
  };

  const handleDelete = () => {
    if (ticket) {
      onDeleteTicket(ticket.id);
    }
  };

  const handleResolve = () => {
    if (ticket) {
      onResolveTicket(ticket.id);
    }
  };

  const handleDelegate = () => {
    setDelegating(!delegating);
  };

  const handleAssignToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAssignedTo(event.target.value);
  };

  const handleDelegateSave = () => {
    if (ticket) {
      onDelegateTicket(ticket.id, assignedTo);
      setDelegating(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {editing && (
        <div>
          <label>
            <RiEdit2Line size={44} />
            <input type="text" value={newTitle} onChange={handleTitleChange} />
          </label>
          <label>
            <textarea value={newDescription} onChange={handleDescriptionChange} />
          </label>
          <button onClick={handleSave}>Guardar</button>
        </div>
      )}
      {!editing && (
        <div>
          <button onClick={handleEdit}>
            <RiEdit2Line size={34} />
          </button>
          <h3 style={{ fontSize: "0.7em" }}>Modificar</h3>
        </div>
      )}
      {!delegating && (
        <div>
          <button onClick={handleDelegate}>
            <RiUserSettingsLine size={34} />
          </button>
          <h3 style={{ fontSize: "0.7em" }}>Delegar</h3>
        </div>
      )}
      {delegating && (
        <div>
          <label>
            <RiUserSettingsLine size={34} />
            <input type="text" onChange={handleAssignToChange} />
          </label>
          <button onClick={handleDelegateSave}>Guardar</button>
        </div>
      )}
      <div>
        <button onClick={handleResolve}>
          <RiCheckLine size={34} />
        </button>
        <h3 style={{ fontSize: "0.7em" }}>Resolver</h3>
      </div>
      <div>
        <button onClick={handleDelete}>
          <RiDeleteBinLine size={34} />
        </button>
        <h3 style={{ fontSize: "0.7em" }}>Eliminar</h3>
      </div>
    </div>
  );
};

export default TicketActions;