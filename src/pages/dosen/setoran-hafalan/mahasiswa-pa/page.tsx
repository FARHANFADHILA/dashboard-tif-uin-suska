import DashboardLayout from "@/components/globals/layouts/dashboard-layout";
import icon_dosenpa_page from "@/assets/svgs/dosen/setoran-hafalan/mahasiswa/icon_dosenpa_page.svg";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { useFilteredMahasiswa } from "@/hooks/use-filtering-searching";
import colourfulProgress from "@/helpers/colourful-progress";
import APISetoran from "@/services/api/dosen/setoran-hafalan.service";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { BackpackIcon, Footprints, SquareArrowOutUpRightIcon } from "lucide-react";
import { tabListStateProps } from "@/interfaces/pages/dosen/setoran-hafalan/mahasiswa-pa/mahasiswa-pa.interface";
import TableLoadingSkeleton from "@/components/globals/table-loading-skeleton";
import ModalBoxRekap from "@/components/dosen/setoran-hafalan/ModalBoxRekapMuroja'ah";
import { useState } from "react";

export default function DosenSetoranHafalanMahasiswaPAPage() {
  const navigate = useNavigate();

  const [openModalRekapMurojaah, setOpenModalRekapMurojaah] = useState<boolean>(false);

  const { data: dataMahasiswa, isLoading } = useQuery({
    queryKey: ["mahasiswa-pa-saya"],
    queryFn: () => APISetoran.getDataMyMahasiswa().then((res) => res.data),
  });

  const { dataCurrent, setSearch, setTabState, tabState } =
    useFilteredMahasiswa(
      dataMahasiswa?.info_mahasiswa_pa.daftar_mahasiswa,
      "semua"
    );

  return (
    <>
      <DashboardLayout>

        <ModalBoxRekap isOpen={openModalRekapMurojaah} setIsOpen={setOpenModalRekapMurojaah} />
        <div className="flex flex-col w-full">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="bg-white flex justify-center items-center shadow-sm text-gray-800 dark:text-gray-200 dark:bg-gray-900 px-2 py-0.5 rounded-md border border-gray-200 dark:border-gray-700 text-md font-medium tracking-tight">
                <span
                  className={`inline-block animate-pulse w-3 h-3 rounded-full mr-2 bg-yellow-400`}
                />
                <BackpackIcon className="w-4 h-4 mr-1.5" />
                Mahasiswa PA Muroja'ah
              </span>

              <div>
                <Button
                  variant="default"
                  className="rounded-md text-white hover:bg-[#0B2B55] hover:active:scale-95 bg-[#0B2B55]"
                  onClick={() => {setOpenModalRekapMurojaah(true)}}
                >
                  <Footprints className="w-4 h-4 mr-1.5" />
                  Rekap Muroja'ah 
                </Button>
              </div>
            </div>
            <div className="flex bg-[#86A7FC] px-4 py-2 relative rounded-lg">
              <div className="flex flex-col text-black gap-1 py-10 w-[72%]">
                <div className="font-bold md:text-3xl text-2xl">Halo, Dosen PA!</div>
                <div className="z-10 hidden md:block">
                  Semangat bertugas! 🎉 Tahun ini kamu membimbing{" "}
                  {dataMahasiswa?.info_mahasiswa_pa.daftar_mahasiswa.length}{" "}
                  mahasiswa. Berikut adalah daftar mahasiswa yang sedang kamu
                  dampingi. Ayo, mari kita mulai bekerja.
                </div>
                <div className="z-10 md:hidden text-xs">
                  Semangat bertugas membimbing{" "}
                  {dataMahasiswa?.info_mahasiswa_pa.daftar_mahasiswa.length}{" "}
                  mahasiswa, mangats! 🎉
                </div>
              </div>

              <div>
                <div className="absolute bottom-0 right-0">
                  <img className="md:w-auto w-[145px]" src={icon_dosenpa_page} alt="" />
                </div>
              </div>
            </div>
          </div>

          <div className="w-0 min-w-full flex flex-col gap-1 sticky top-[44.3px] z-50 bg-background pt-2.5 pb-3.5">
            <div className="max-w-[22rem] md:max-w-full">
              <Tabs defaultValue="tab1" className="w-full h-full">
                <ScrollArea className="h-full py-2">
                  <TabsList className="flex gap-1.5 whitespace-nowrap justify-start px-3 w-max">
                    <TabsTrigger
                      value="tab1"
                      onClick={() => setTabState("semua")}
                      className={`data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:font-semibold ${
                        tabState !== "semua" &&
                        "hover:bg-blue-100 dark:hover:bg-background/20"
                      }`}
                    >
                      Semua Angkatan
                    </TabsTrigger>
                    {dataMahasiswa?.info_mahasiswa_pa.ringkasan?.map(
                      (item: tabListStateProps) => (
                        <TabsTrigger
                          key={item.tahun}
                          onClick={() => setTabState(item.tahun)}
                          value={item.tahun}
                          className={`data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:font-semibold ${
                            tabState !== item.tahun &&
                            "hover:bg-blue-100 dark:hover:bg-background/20"
                          }`}
                        >
                          {item.tahun}{" "}
                          <span className="ml-2 px-2 rounded-xl bg-yellow-600 text-white">
                            {item.total} mhs
                          </span>
                        </TabsTrigger>
                      )
                    )}
                  </TabsList>
                  <ScrollBar
                    orientation="horizontal"
                    className="cursor-pointer"
                  />
                </ScrollArea>
              </Tabs>
            </div>

            <div>
              <Input
                placeholder="Cari mahasiswa berdasarkan nama ataupun NIM..."
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                className="w-full md:block hidden"
              />
              <Input
                placeholder="Cari berdasar nama ataupun NIM..."
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                className="w-full md:hidden"
              />
            </div>
          </div>

          <div className="w-0 min-w-full flex flex-col gap-3 overflow-x-auto max-w-[22rem] md:max-w-full">
            <Table>
              <TableHeader>
                <TableRow className="border border-solid border-secondary bg-muted">
                  <TableHead className="text-center">No.</TableHead>
                  <TableHead className="text-center whitespace-nowrap">Nama Mahasiswa</TableHead>
                  <TableHead className="text-center whitespace-nowrap">NIM</TableHead>
                  <TableHead className="text-center whitespace-nowrap">Semester</TableHead>
                  <TableHead className="text-center whitespace-nowrap">
                    Progres Muroja'ah
                  </TableHead>
                  <TableHead className="text-center px-10 whitespace-nowrap">
                    Terakhir Muroja'ah
                  </TableHead>
                  <TableHead className="text-center whitespace-nowrap">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="border border-solid border-secondary">
                {dataCurrent?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      ❌ Data tidak ditemukan
                    </TableCell>
                  </TableRow>
                )}
                {isLoading && <TableLoadingSkeleton columns={7} rows={7} />}
                {dataCurrent?.map((item, index) => (
                  <TableRow
                    key={item.nim}
                    className={
                      index % 2 !== 0
                        ? "bg-secondary hover:bg-secondary"
                        : "bg-background hover:bg-background"
                    }
                  >
                    <TableCell className="text-center">{index + 1}.</TableCell>
                    <TableCell className="text-center whitespace-nowrap">{item.nama}</TableCell>
                    <TableCell className="text-center whitespace-nowrap">{item.nim}</TableCell>
                    <TableCell className="text-center whitespace-nowrap">
                      {item.semester}
                    </TableCell>
                    <TableCell className="text-center px-4 whitespace-nowrap">
                      <div className="flex gap-1.5 items-center w-full">
                        <div className="w-[90%]">
                          <Progress
                            value={item.info_setoran.persentase_progres_setor}
                            color={colourfulProgress(
                              item.info_setoran.persentase_progres_setor
                            )}
                            className="h-3"
                            style={{ maxWidth: "100%" }}
                          />
                        </div>
                        <div className="w-[10%]">
                          <span className="text-center">
                            {item.info_setoran.persentase_progres_setor}%
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center whitespace-nowrap">
                      {item.info_setoran.terakhir_setor || "-"}
                    </TableCell>
                    <TableCell className="text-center w-40 whitespace-nowrap">
                      <Button
                        variant={"outline"}
                        className="border-secondary border-2 rounded-xl text-foreground hover:scale-105 active:scale-95"
                        onClick={() =>
                          navigate(`/dosen/murojaah/mahasiswa-pa/${item.nim}`)
                        }
                      >
                        <SquareArrowOutUpRightIcon />
                        Lihat Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

