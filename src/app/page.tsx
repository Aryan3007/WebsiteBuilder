import LogoutButton from "@/components/Logout-Button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions)

  if(!session){
    return(
      <div>
        Loadfing....
      </div>
    )
  }

  
  return (
    <div>
      <LogoutButton session={session}/>
    </div>
  );
}
