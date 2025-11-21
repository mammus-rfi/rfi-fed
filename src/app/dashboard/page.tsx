import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Bem-vindo, {session?.user?.name}</h1>
      <p className="mt-2 text-gray-600">Esta é a área protegida do dashboard.</p>
      <div className="mt-6 overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Informações da Sessão</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <pre className="overflow-auto rounded bg-gray-100 p-4">
              {JSON.stringify(session, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
