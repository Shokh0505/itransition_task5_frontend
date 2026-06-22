import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import type { Song } from "./tableCard";
import { TableCollapse } from "./tableCollapse";

interface TableListProps {
    song: Song;
    songID: number | null;
    isCollapsed: boolean;
    handleSelectSong: (id: number) => void;
}

export const TableList = ({ song, songID, isCollapsed, handleSelectSong }: TableListProps) => {
    return (
        <>
            <tr onClick={() => handleSelectSong(song.id)}>
                <td className="px-4 py-3">
                    {songID === song.id && isCollapsed ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </td>
                <td className="px-4 py-3">{song.id}</td>
                <td className="px-4 py-3">{song.name}</td>
                <td className="px-4 py-3">{song.artist}</td>
                <td className="px-4 py-3">{song.album}</td>
                <td className="px-4 py-3">{song.genre}</td>
            </tr>
            <TableCollapse isOpen={isCollapsed && songID === song.id} song={song} />
        </>
    )
}
