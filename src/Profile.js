export const Profile = () => {

    const [allNFTs, setAllNFTs] = React.useState([{}])
    const API_KEY = process.env.REACT_APP_API_KEY

    React.useEffect(() => {
        console.log(' -------------------- useEffect triggered --------------------')
        async function getNFTs(chain) {
            const options = {method: 'GET', headers: {Accept: 'application/json', 'X-API-Key': `${API_KEY}`}};
            const contractAddress = "0x" // ADD MARKETPLACE ADDRESS

            fetch(`https://deep-index.moralis.io/api/v2/${contractAddress}/nft?chain=${chain}&format=decimal`, options)
                .then(response => response.json())
                .then(response => getMetadata([...response.result]))
                .then(response => setAllNFTs(response))
                .catch(err => console.error(err));
        }
        
        getNFTs("Rinkeby")
        console.log(allNFTs.length)
    }, [])
    
    function getMetadata(props) {
        let array = []
        if (props.length>1){
            props.map((res, i) => {
                if (res.metadata) {
                    let convertedToJSON = JSON.parse(res.metadata)
                    array.push(convertedToJSON)
                }
            })
        }
        return array
    }
    
    return (
        <div>

        </div>
    )
}