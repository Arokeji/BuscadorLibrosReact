import "./Buscador.scss";
import React from "react";
import { useDebounce } from "use-debounce";

const API_URL = "https://www.googleapis.com/books/v1/volumes?q=";



const Buscador = () => {

    const [booksList, setBooksList] = React.useState([]);

    const [filter, setFilter] = React.useState("");

    const [filterWithTime] = useDebounce(filter, 500);

    React.useEffect(() => {

        // Llamada a la API
        filterWithTime.length > 3 ? 
        fetch(`${API_URL}${filterWithTime}`)
            .then((response) => response.json())
            .then((data) => {
                setBooksList(data);
                console.log(setBooksList);
            }) : setBooksList("");
    }, [filterWithTime]);

    return (
        <div className="books">
            
            <p>Buscador de libros:</p>

            <input type="text"
                placeholder="Escribe el titulo de un libro"
                value={filter}
                onChange={(event) => setFilter(event.target.value)}>
            </input>

            <table className="books__table">
                <thead>
                    <tr className="books__row">
                        <th className="books__titles">Autores</th>
                        <th className="books__titles">Titulo</th>
                        <th className="books__titles">Portada</th>
                    </tr>
                </thead>
                <tbody>
                    {booksList.length === 0 ? (
                        <tr className="books__row">
                            <td className="books__field"></td>
                            <td className="books__field">Escribe el titulo de un libro</td>
                            <td className="books__field"></td>
                        </tr>
                    ) : (
                        booksList.items.map((book) => (
                            <tr key={book.id} className="books__row">
                                <td className="books__field">{book.volumeInfo.authors === undefined ? "Autor desconocido" : book.volumeInfo.authors + " "}</td>
                                <td className="books__field">{book.volumeInfo.title === undefined ? "Autor desconocido" : book.volumeInfo.title}</td>
                                <td className="books__field">{book.volumeInfo.imageLinks ? "Sin imagen" : null /*<img src={book.volumeInfo.imageLinks.smallThumbnail} alt="Portada"/>*/}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Buscador;