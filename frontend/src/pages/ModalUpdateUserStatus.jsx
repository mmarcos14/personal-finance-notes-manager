import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'react-bootstrap'
import { updateOne } from '../services/apiService'
import toast from 'react-hot-toast'

export default function ModalUpdateUserStatus({
  isOpen,
  currentUser,
  HideModal,
  refresh
}) {
  const [DataUser, setDataUser] = useState({
    id: '',
    decision: ''
  })

  // Remplir les données quand l'utilisateur change
  useEffect(() => {
    if (currentUser?.id) {
      setDataUser({
        id: currentUser.id,
        decision: currentUser.status
      })
    }
  }, [currentUser])

  // Gestion du select (conversion string -> number)
  const handleInput = (e) => {
    setDataUser({
      ...DataUser,
      [e.target.name]: Number(e.target.value)
    })
  }

  // Soumission
  const Submit = async (e) => {
    e.preventDefault()
    console.log(DataUser)
    if (DataUser.decision === '') return

    try {
      const response = await updateOne('user', DataUser)
      console.log(response)

      if (response?.status === 200) {
        refresh()
        HideModal()
        toast.success(response.data.message)
      }
    } catch (error) {
      console.error('Update failed:', error)
    }
  }

  return (
    <Modal show={isOpen} centered onHide={HideModal}>
      <ModalHeader closeButton>
        Update user status
      </ModalHeader>

      <ModalBody>
        <form onSubmit={Submit}>
          <div className="form-group">
            <select
              className="form-select"
              name="decision"
              value={DataUser.decision}
              onChange={handleInput}
              required
            >
              <option value="">Select status</option>
              <option value="-1">Disabled</option>
              <option value="0">User level 1</option>
              <option value="1">user</option>
              <option value="2">Manager</option>
              <option value="3">Admin</option>
            </select>
          </div>
          <div className="form-group mt-3 text-end">
            <button
              type="submit"
              className="btn btn-sm btn-primary"
            >
              Update
            </button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  )
}
