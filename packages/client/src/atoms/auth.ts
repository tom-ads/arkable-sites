import { User } from "@/gql/graphql";
import { atom } from "jotai";

export type Session = {
  isAuthenticated: boolean;
  user?: User;
};

const authAtom = atom<Session>({
  isAuthenticated: false,
  user: undefined,
});

export default authAtom;
