import { useState, useEffect } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

const MentalHealthDashboard = () => {
  const today = format(new Date(), "dd/MM/yyyy");

  const [mood, setMood] = useState(5);
  const [anxiety, setAnxiety] = useState(5);
  const [note, setNote] = useState("");
  const [history, setHistory] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  // Caricare i dati salvati dal localStorage all'avvio
  useEffect(() => {
    const savedData = localStorage.getItem("mentalHealthHistory");
    if (savedData) {
      setHistory(JSON.parse(savedData));
    }
  }, []);

  // Salvare ogni volta che history cambia
  useEffect(() => {
    localStorage.setItem("mentalHealthHistory", JSON.stringify(history));
  }, [history]);

  const saveDay = () => {
    const newEntry = { date: today, mood, anxiety, note };
    const updatedHistory = [
      ...history.filter((entry) => entry.date !== today),
      newEntry,
    ].slice(-30);
    setHistory(updatedHistory);
    setMood(5);
    setAnxiety(5);
    setNote("");
  };

  const moodAvg = (
    history.slice(-7).reduce((acc, cur) => acc + cur.mood, 0) /
    (history.slice(-7).length || 1)
  ).toFixed(1);
  const anxietyAvg = (
    history.slice(-7).reduce((acc, cur) => acc + cur.anxiety, 0) /
    (history.slice(-7).length || 1)
  ).toFixed(1);

  const todayEntry = history.find((entry) => entry.date === today);
  const todayAvg = todayEntry
    ? ((todayEntry.mood + todayEntry.anxiety) / 2).toFixed(1)
    : null;

  const getColor = (value) => {
    if (value >= 8) return "bg-green-100 text-green-700";
    if (value >= 5) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  const getJudgement = (value) => {
    if (value >= 8) return { text: "Giornata ottima", emoji: "🙂" };
    if (value >= 5) return { text: "Giornata media", emoji: "😐" };
    return { text: "Giornata difficile", emoji: "🙁" };
  };

  const findDayEntry = (day) => {
    return history.find((entry) => parseInt(entry.date.split("/")[0]) === day);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8 font-sans grid gap-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-blue-900">
          Monitoraggio salute mentale
        </h1>
        <p className="text-blue-700 text-lg">Umore e ansia quotidiani</p>
        <p className="text-blue-600 text-sm mt-1">{today}</p>
      </header>

      <section className="bg-white p-6 rounded-2xl shadow grid gap-6">
        <h2 className="text-xl font-semibold">Input giornaliero</h2>
        <div>
          <label>Quanto è stato positivo il tuo umore oggi?</label>
          <input
            type="range"
            min="1"
            max="10"
            value={mood}
            onChange={(e) => setMood(Number(e.target.value))}
            className="accent-green-300 w-full"
          />
          <div className="flex justify-between text-xs px-1">
            {Array.from({ length: 10 }, (_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>
        </div>
        <div>
          <label>Quanto hai sentito sotto controllo la tua ansia oggi?</label>
          <input
            type="range"
            min="1"
            max="10"
            value={anxiety}
            onChange={(e) => setAnxiety(Number(e.target.value))}
            className="accent-blue-300 w-full"
          />
          <div className="flex justify-between text-xs px-1">
            {Array.from({ length: 10 }, (_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>
        </div>
        <Textarea
          maxLength={100}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Scrivi una breve nota sulla tua giornata..."
        />
        <Button
          onClick={saveDay}
          className="rounded-full bg-blue-400 hover:bg-blue-500"
        >
          Salva giornata
        </Button>
      </section>

      <section className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          Andamento ultimi 30 giorni
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={history}>
            <XAxis dataKey="date" hide />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={false}
              opacity={0.8}
            />
            <Line
              type="monotone"
              dataKey="anxiety"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
              opacity={0.8}
            />
          </LineChart>
        </ResponsiveContainer>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className={getColor(moodAvg)}>
          <CardContent className="p-6 text-center">
            <h2 className="text-lg font-semibold">
              Media umore ultimi 7 giorni
            </h2>
            <p className="text-3xl font-bold">{moodAvg}</p>
            <p>Andamento medio</p>
          </CardContent>
        </Card>

        <Card className={getColor(anxietyAvg)}>
          <CardContent className="p-6 text-center">
            <h2 className="text-lg font-semibold">
              Media ansia ultimi 7 giorni
            </h2>
            <p className="text-3xl font-bold">{anxietyAvg}</p>
            <p>Andamento medio</p>
          </CardContent>
        </Card>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white shadow p-6 flex flex-col items-center justify-center">
          {todayAvg && (
            <>
              <div className="text-4xl">{getJudgement(todayAvg).emoji}</div>
              <p className="text-2xl font-semibold mt-2">
                {getJudgement(todayAvg).text}
              </p>
            </>
          )}
          {!todayAvg && <p>Nessun dato odierno</p>}
        </Card>

        <Card className="bg-white shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Trend settimanale</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={history.slice(-7)}>
              <XAxis dataKey="date" hide />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Bar dataKey="mood" fill="#82ca9d" />
              <Bar dataKey="anxiety" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </section>

      <section className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Calendario mensile</h2>
        <div className="grid grid-cols-7 gap-2 text-center">
          {Array.from({ length: 30 }).map((_, i) => {
            const entry = findDayEntry(i + 1);
            const color = entry
              ? getColor((entry.mood + entry.anxiety) / 2)
              : "bg-blue-100";
            return (
              <div
                key={i}
                className={`rounded p-2 text-sm cursor-pointer ${color}`}
                onClick={() => setSelectedDay(entry)}
              >
                {i + 1}
              </div>
            );
          })}
        </div>
        {selectedDay && (
          <div className="mt-4 p-4 bg-blue-100 rounded">
            <p>
              <strong>Data:</strong> {selectedDay.date}
            </p>
            <p>
              <strong>Umore:</strong> {selectedDay.mood}
            </p>
            <p>
              <strong>Ansia:</strong> {selectedDay.anxiety}
            </p>
            <p>
              <strong>Nota:</strong> {selectedDay.note || "Nessuna nota"}
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default MentalHealthDashboard;
