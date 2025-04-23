import AdminLayout from '@/components/Layout';
import CheckList from '@/components/CheckList';


export default function AdminPanelPage() {
  return (
    <AdminLayout>
      <div className="w-[95%]">
        <h1 className="text-2xl font-bold mb-4">Minha escola</h1>
        <div className="p-5 bg-purple-200 rounded-full">
          <p>
            🔥 Seu site já está disponível no link:  edulinker.com.br/escolamusiqueiros
          </p>
        </div>

        <div className="mt-5 mb-5 ps-5">
          <h2 className="font-bold">Confira os passos para deixar sua escola do seu jeito!</h2>
        </div>

        <div className="w-5/6">
          <CheckList />
        </div>

      </div>
    </AdminLayout>
  );
}