
const CountryInfo = ({country, fullList}) => {

    const CountryObject = fullList.filter(object => object.name.toLowerCase() === country.toLowerCase())
    return(
        <div>
            <h1>{country}</h1> 
            <p>Capital City: {CountryObject[0].capital}</p>
            <p>Population: {CountryObject[0].population}</p>
            <p>Region: {CountryObject[0].subregion}</p>
            <p>Language(s):</p>
            <ul>
                {CountryObject[0].languages.map(language => <li>{language.name}</li>)}
            </ul>
            <img style={{maxHeight: '100px'}} src={CountryObject[0].flag} alt='flag' />
        </div>
    )
}


export default CountryInfo