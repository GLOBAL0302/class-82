import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchArtist } from "./artistsThunk";
import ArtistCard from "./ArtistCard";
import { selectArtists } from "./artistsSlice";

const ArtistsFeature = () => {
    const useDispatch = useAppDispatch();
    const allArtist = useAppSelector(selectArtists)
    console.log(allArtist)

    const fetchAllArtist = useCallback(()=>{
        useDispatch(fetchArtist())
    },[])

    useEffect(()=>{
        void fetchAllArtist()
    },[])
  return (
    <div className="flex gap-3">
        {allArtist.map(item=>(<ArtistCard key={item._id} artist={item}/>))}
    </div>
  )
};

export default ArtistsFeature;
