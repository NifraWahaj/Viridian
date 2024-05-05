import { useState } from "react";
import {
  useCreateGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
  useFetchGenresQuery,
} from "../../redux/api/genre";

import { toast } from "react-toastify";
import GenreForm from "../../component/GenreForm";
import Modal from "../../component/Modal";

import "./GenreList.css";


const GenreList = () => {
  const { data: genres, refetch } = useFetchGenresQuery();
  const [name, setName] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createGenre] = useCreateGenreMutation();
  const [updateGenre] = useUpdateGenreMutation();
  const [deleteGenre] = useDeleteGenreMutation();

  const handleCreateGenre = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Genre name is required");
      return;
    }

    try {
      const result = await createGenre({ name }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created.`);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating genre failed, try again.");
    }
  };

  const handleUpdateGenre = async (e) => {
    e.preventDefault();

    if (!updateGenre) {
      toast.error("Genre name is required");
      return;
    }

    try {
      const result = await updateGenre({
        id: selectedGenre._id,
        updateGenre: {
          name: updatingName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        refetch();
        setSelectedGenre(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteGenre = async () => {
    try {
      const result = await deleteGenre(selectedGenre._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted.`);
        refetch();
        setSelectedGenre(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Genre deletion failed. Tray again.");
    }
  };

  return (
    <div className="container mt-4 main-cont" style={{ maxWidth: "55rem"  }}>
    <h2 className="card-title text-center mb-4"  >Manage Genres</h2>

    <h5 className="card-title mb-4" style={{ marginLeft: "1rem"   }}>Add a new genre:</h5>

    <GenreForm
      value={name}
      setValue={setName}
      handleSubmit={handleCreateGenre}
    />

    <br />

    <h5 className="card-title mb-4" style={{ marginLeft: "1rem"   }}>Click on a genre to update or delete:</h5>


    <div className="row" style={{ marginLeft: "0%"  }}>
      {genres?.map((genre) => (
        <div key={genre._id} className="col-md-3">
          <button
            className="custom-btn2"
            onClick={() => {
              setModalVisible(true);
              setSelectedGenre(genre);
              setUpdatingName(genre.name);
            }}
          >
            {genre.name}
          </button>
        </div>
      ))}
    </div>

    <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
      <GenreForm
        value={updatingName}
        setValue={(value) => setUpdatingName(value)}
        handleSubmit={handleUpdateGenre}
        buttonText="Update"
        handleDelete={handleDeleteGenre}
      />
    </Modal>
  </div>
);
};


export default GenreList;
