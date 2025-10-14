export interface FamilyMember {
  id: string;
  name: string;
  dob?: string;
  gender?: 'Male' | 'Female' | 'Other';
  occupation?: string;
  email?: string;
  phone?: string;
  address?: string;
  parentId?: string | null;
  relationType?: string;
  notes?: string;
}

export interface TreeNode extends FamilyMember {
  children: TreeNode[];
}
