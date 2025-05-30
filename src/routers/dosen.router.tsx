import ProtectedRoute from "./protected.router";
import DosenSetoranHafalanMahasiswaPAPage from "@/pages/dosen/setoran-hafalan/mahasiswa-pa/page";
import DosenKerjaPraktikmahasiswaBimbinganpage from "@/pages/dosen/kerja-praktik/mahasiswa-bimbingan-kp/page";
import DosenKerjaPraktikMahasiswaBimbinganKPDetailpage from "@/pages/dosen/kerja-praktik/mahasiswa-bimbingan-kp/detail/page";
import DetailMahasiswaSetoran from "@/pages/dosen/setoran-hafalan/mahasiswa-pa/DetailMahasiswaSetoran";
import DosenPengujiNilaiPage from "@/pages/dosen/seminar-kerja-praktik/nilai-penguji/page";
import NilaiSeminarPenguji from "@/pages/dosen/seminar-kerja-praktik/nilai-penguji/NilaiSeminarPenguji";

export const dosenRouter = [
	{
		path: "/dosen/murojaah/mahasiswa-pa",
		element: (
			<ProtectedRoute roles={["dosen"]}>
				<DosenSetoranHafalanMahasiswaPAPage />
			</ProtectedRoute>
		),
	},
	{
		path: "/dosen/murojaah/mahasiswa-pa/:nim",
		element: (
			<ProtectedRoute roles={["dosen"]}>
				<DetailMahasiswaSetoran />
			</ProtectedRoute>
		),
	},
	{
		path: "/dosen/kerja-praktik/mahasiswa-bimbingan-kp",
		element: (
			<ProtectedRoute roles={["dosen"]}>
				<DosenKerjaPraktikmahasiswaBimbinganpage />
			</ProtectedRoute>
		),
	},
	{
		path: "/dosen/kerja-praktik/mahasiswa-bimbingan-kp/detail",
		element: (
			<ProtectedRoute roles={["dosen"]}>
				<DosenKerjaPraktikMahasiswaBimbinganKPDetailpage />
			</ProtectedRoute>
		),
	},
	{
		path: "/dosen/seminar-kp/nilai-penguji",
		element: (
			<ProtectedRoute roles={["dosen"]}>
				<DosenPengujiNilaiPage />
			</ProtectedRoute>
		),
	},
	{
		path: "/dosen/seminar-kp/nilai-penguji/input-nilai",
		element: (
			<ProtectedRoute roles={["dosen"]}>
				<NilaiSeminarPenguji />
			</ProtectedRoute>
		),
	},
];