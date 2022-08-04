import React from "react";
import '../styles/paginado.css';

export default function Paginado({recipesPerPage, allRecipes, paginado}) {
    const pageNumbers = [];
    //console.log(pageNumbers) //cantidad de paginas

    //math.ceil -> redondea
    for (let i = 1; i <= Math.ceil(allRecipes/recipesPerPage); i++) {
        //console.log("i", i) // i 1 , i 2 , cantidad de paginas
        pageNumbers.push(i) 
    };

    return(
        <div className="pag-div">
            <ul>
                { pageNumbers && 
                pageNumbers.map(number => (
                    <li key={number}>
                    <button className="pag-btn" onClick={() => paginado(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}