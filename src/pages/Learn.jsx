import Button from "../components/common/Button";
import Card from "../components/common/Card";

const lessons = [
  {
    title: "What is Bitcoin?",
    description: "Learn why Bitcoin was created and how its network secures value.",
  },
  {
    title: "What is Blockchain?",
    description: "Understand decentralized ledgers, consensus, and immutable records.",
  },
  {
    title: "How crypto works",
    description: "Explore wallets, private keys, and how transfers settle globally.",
  },
  {
    title: "Crypto trading basics",
    description: "Read candlesticks, order books, and risk rules for beginners.",
  },
];

const Learn = () => {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-slate-900">Learn crypto basics</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        Short explainers that mirror Coinbase Learn so users can go from zero to confident.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {lessons.map((lesson) => (
          <Card key={lesson.title} className="overflow-hidden">
            <div className="h-40 bg-gradient-to-br from-[#dfe9ff] to-[#edf3ff]" />
            <div className="p-5">
              <h2 className="text-xl font-semibold text-slate-900">{lesson.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{lesson.description}</p>
              <Button variant="secondary" className="mt-4 rounded-full">Read more</Button>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default Learn;
