import AdminLayout from '@/components/Layout';
import CheckList from '@/components/CheckList';


export default function AdminPanelPage() {
  return (
    <AdminLayout>
      <div className="sm:p-6">
        <h1 className="text-2xl font-bold ms-4 my-4 text-center sm:text-start">Minha escola</h1>
        <div className="p-5 bg-purple-200 rounded-full">
          <p className="text-center sm:text-start">
            🔥 Seu site já está disponível no link:  edulinker.com.br/escolamusiqueiros
          </p>
        </div>

        <div className="mt-5 mb-5 ps-5">
          <h2 className="font-bold text-center sm:text-start">Confira os passos para deixar sua escola do seu jeito!</h2>
        </div>

        <div className="w-full">
          <CheckList />
        </div>

      </div>
    </AdminLayout>
  );
}