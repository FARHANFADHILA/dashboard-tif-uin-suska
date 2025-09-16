import { getRoles } from "@/helpers/auth.helper";
import { DecodeTokenProps } from "@/interfaces/helpers/auth.interface";

const handleGoToDashboard = ({ token }: DecodeTokenProps) => {
    const userRoles = getRoles({ token });
    if (userRoles.includes("mahasiswa")) return ("/mahasiswa/murojaah/detail-riwayat");
    else if (userRoles.includes("dosen")) return ("/dosen/murojaah/mahasiswa-pa");
    else if (userRoles.includes("wakil-dekan-3")) return ("/wakil-dekan-3/dashboard/setoran-hafalan");
    else return ("/");
};

export { handleGoToDashboard };