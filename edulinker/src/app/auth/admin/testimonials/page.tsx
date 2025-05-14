import AdminLayout from '@/components/Layout';

export default function AdminPanelPage() {
    return (
        <AdminLayout>
            <div className="w-[95%]">
                <h1 className="text-2xl font-bold mb-4">Minha escola</h1>
                <div className="p-5 bg-purple-200 rounded-full">
                    <p>
                        Depoimentos
                    </p>
                </div>



            </div>
        </AdminLayout>
    );
}