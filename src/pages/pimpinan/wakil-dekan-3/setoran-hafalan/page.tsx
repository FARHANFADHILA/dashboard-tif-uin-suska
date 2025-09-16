import DashboardLayout from "@/components/globals/layouts/dashboard-layout";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import {
  TrendingUp,
  Users,
  CheckCircle,
  XCircle,
  Award,
  BookOpen,
  Calendar,
  RefreshCw,
} from "lucide-react";

// --- DATA DUMMY ---
const totalMahasiswa = 500;
const mahasiswaSelesai = 100;

const dataPerAngkatan = [
  { angkatan: "2021", selesai: 145, total: 150 },
  { angkatan: "2022", selesai: 130, total: 160 },
  { angkatan: "2023", selesai: 155, total: 170 },
  { angkatan: "2024", selesai: 148, total: 200 },
];
const detailData = [
  { kategori: "Kerja Praktik", selesai: 578, persentase: 85 },
  { kategori: "Seminar Kerja Praktik", selesai: 512, persentase: 75 },
  { kategori: "Tugas Akhir", selesai: 389, persentase: 90 },
  { kategori: "Seminar Proposal", selesai: 389, persentase: 50 },
  { kategori: "Sidang Tugas Akhir", selesai: 389, persentase: 60 },
];
export default function WakilDekan3SetoranHafalan() {
  const mahasiswaBelumSelesai = totalMahasiswa - mahasiswaSelesai;
  const persentaseSelesai = Math.round(
    (mahasiswaSelesai / totalMahasiswa) * 100
  );

  const dataPieChart = [
    { name: "Selesai", value: mahasiswaSelesai },
    { name: "Belum Selesai", value: mahasiswaBelumSelesai },
  ];
  const COLORS = ["#10B981", "#F59E0B"];

  const dataBarChart = dataPerAngkatan.map((item) => ({
    ...item,
    "Belum Selesai": item.total - item.selesai,
  }));
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50 text-slate-800 rounded-xl">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Dashboard Monitoring Hafalan
              </h1>
              <p className="text-slate-500 mt-1">Teknik Informatika</p>
            </div>
            <button className="flex items-center justify-center mt-4 sm:mt-0 px-4 py-2 bg-white text-slate-700 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors duration-200 text-sm font-medium">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Data
            </button>
          </header>
          {/* --- KPI Cards --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatCard
              icon={<Users className="text-blue-500" />}
              title="Total Mahasiswa"
              value={totalMahasiswa.toLocaleString("id-ID")}
              trendInfo="+5% dari semester lalu"
            />
            <StatCard
              icon={<CheckCircle className="text-green-500" />}
              title="Sudah Selesai"
              value={mahasiswaSelesai.toLocaleString("id-ID")}
              trendInfo="+12% bulan ini"
            />
            <StatCard
              icon={<XCircle className="text-orange-500" />}
              title="Belum Selesai"
              value={mahasiswaBelumSelesai.toLocaleString("id-ID")}
              trendInfo="-3% bulan ini"
            />
            {/* <StatCard
              icon={<Award className="text-purple-500" />}
              title="Tingkat Keberhasilan"
              value={`${persentaseSelesai}%`}
              trendInfo="Target: 90%"
            /> */}
          </div>

          {/* --- Main Grid --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
            {/* --- Kolom Kiri --- */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              <ChartContainer
                title="Persentase Muroja'ah Mahasiswa"
                icon={<TrendingUp />}
              >
                <div className="relative w-full h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={dataPieChart}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={110}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        cornerRadius={8}
                      >
                        {dataPieChart.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #e2e8f0",
                          borderRadius: "0.5rem",
                        }}
                        wrapperStyle={{ zIndex: 10 }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-slate-800">
                      {persentaseSelesai}%
                    </span>
                    <p className="text-sm text-slate-500">Selesai</p>
                  </div>
                </div>
              </ChartContainer>
              <ChartContainer title="Analisis per Angkatan" icon={<Calendar />}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={dataBarChart}
                    margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                  >
                    <XAxis
                      dataKey="angkatan"
                      stroke="#94a3b8"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#94a3b8"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e2e8f0",
                        borderRadius: "0.5rem",
                      }}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
                    />
                    <Bar
                      dataKey="selesai"
                      name="Selesai"
                      fill="#10B981"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="Belum Selesai"
                      fill="#F59E0B"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            {/* --- Kolom Kanan --- */}
            <div className="lg:col-span-1 flex flex-col gap-8">
              <ChartContainer title="Progres per Kategori" icon={<BookOpen />}>
                <div className="space-y-4">
                  {detailData.map((item) => (
                    <CategoryProgress
                      key={item.kategori}
                      category={item.kategori}
                      percentage={item.persentase}
                    />
                  ))}
                </div>
              </ChartContainer>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  trendInfo: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  title,
  value,
  trendInfo,
}) => (
  <div className="bg-white rounded-xl py-2 px-4 border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all duration-300">
    <div className="flex items-center gap-2">
      <div className="bg-slate-100 p-3 rounded-lg">{icon}</div>
      <div className="flex flex-col justify-center">
        <p className="text-sm text-slate-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
    <p className="text-xs text-slate-400">{trendInfo}</p>
  </div>
);

interface ChartContainerProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  icon,
  children,
}) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200">
    <div className="flex items-center mb-4">
      <div className="text-slate-500">
        {React.cloneElement(icon as React.ReactElement, {
          className: "w-5 h-5",
        })}
      </div>
      <h3 className="text-lg font-semibold text-slate-800 ml-3">{title}</h3>
    </div>
    {children}
  </div>
);

interface CategoryProgressProps {
  category: string;
  percentage: number;
}

const CategoryProgress: React.FC<CategoryProgressProps> = ({
  category,
  percentage,
}) => (
  <div>
    <div className="flex justify-between items-center mb-1">
      <p className="text-sm font-medium text-slate-700">{category}</p>
      <p className="text-sm font-bold text-green-600">{percentage}%</p>
    </div>
    <div className="w-full bg-slate-200 rounded-full h-2">
      <div
        className="bg-green-500 h-2 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
);
