import { getAllUsersUsernames } from '@/actions/user.action'
import AddUser from '@/components/AddUser'
import Container from '@/components/Container'
import DeleteUser from '@/components/DeleteUser'
import { authOptions } from '@/lib/authOptions'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'

const AdminManagePage = async () => {
  const session = await getServerSession(authOptions)

  if (session?.user.role !== 'admin') return notFound()

  const users = await getAllUsersUsernames()

  const restUsers = users?.filter(
    (user) => user.username !== session?.user.name && user.username !== 'admin'
  )

  return (
    <Container
      className="bg-custom-yellow flex-1 py-12"
      innerClassName="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-semibold text-center tracking-widest">
          {'PřidAT kÁMOše :---)'}
        </h2>
        <AddUser />
      </div>
      {restUsers && restUsers.length > 0 && (
        <div className="w-full mx-auto">
          <h2 className="text-2xl font-semibold text-center tracking-widest">
            {'OdstrANit kÁMOše :---('}
          </h2>
          <DeleteUser users={restUsers} />
        </div>
      )}
    </Container>
  )
}

export default AdminManagePage
