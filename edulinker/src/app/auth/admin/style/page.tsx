import AdminLayout from '@/components/Layouts/AdminLayout';

export default function AdminStylePage() {
    return (
        <AdminLayout>
            <div className="sm:p-6">
                <h1 className="text-2xl font-bold ms-4 my-4 text-center sm:text-start">Minha escola</h1>

                <div className="flex justify-center">
                    <h2 className="text-2xl font-bold px-8 py-4 rounded-full bg-[#9FFF64]">Estilize seu site</h2>
                </div>

            </div>
        </AdminLayout>
    );
}
