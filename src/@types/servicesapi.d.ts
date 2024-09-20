interface LoginParams {
  username: string;
  password: string;
}

interface TokenParams {
  token: string;
}

interface UserParams {
  id: string;
}

interface UserCreateParams {
  name: string;
  email: string;
  password: string;
}

interface LeadParams {
  leadId: string;
}

interface PaginationParams {
  page: number;
  size: number;
}

interface DropdownParams {
  id: string;
}
