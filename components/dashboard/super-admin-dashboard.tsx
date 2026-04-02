
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Building2, Users, UserCog, Download, Plus, Edit, Trash2, AlertTriangle, Eye, ClipboardList, ChevronDown, ChevronRight, Filter, Key, LayoutDashboard } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface SuperAdminDashboardProps {
  session: any;
}

export default function SuperAdminDashboard({ session }: SuperAdminDashboardProps) {
  const [stats, setStats] = useState({
    totalCompanies: 0,
    totalUsers: 0,
    totalStudents: 0,
    totalCompanyAdmins: 0,
    totalModules: 10
  });

  const [companies, setCompanies] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);

  // Company management state
  const [isCompanyDialogOpen, setIsCompanyDialogOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<any>(null);
  const [companyForm, setCompanyForm] = useState({
    companyName: '',
    companyCode: '',
    adminName: '',
    adminEmail: '',
    adminPassword: ''
  });

  // Module editing state
  const [isModuleDialogOpen, setIsModuleDialogOpen] = useState(false);
  const [editingModule, setEditingModule] = useState<any>(null);
  const [moduleForm, setModuleForm] = useState({ title: '', description: '', content: '', youtubeUrl: '' });

  // Survey results modal state
  const [isSurveyModalOpen, setIsSurveyModalOpen] = useState(false);
  const [surveyResults, setSurveyResults] = useState<any[]>([]);
  const [surveyLoading, setSurveyLoading] = useState(false);
  const [surveyFilterCompany, setSurveyFilterCompany] = useState<string>('all');
  const [surveyFilterFrom, setSurveyFilterFrom] = useState<string>('');
  const [surveyFilterTo, setSurveyFilterTo] = useState<string>('');
  const [surveyTotal, setSurveyTotal] = useState(0);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  // User Directory modal state
  const [isUserDirectoryOpen, setIsUserDirectoryOpen] = useState(false);
  const [userDirFilterCompany, setUserDirFilterCompany] = useState<string>('all');
  const [userDirFilterCode, setUserDirFilterCode] = useState<string>('all');
  const [userDirFilterFrom, setUserDirFilterFrom] = useState<string>('');
  const [userDirFilterTo, setUserDirFilterTo] = useState<string>('');

  // Company codes state
  const [newCodeInput, setNewCodeInput] = useState('');
  const [addingCode, setAddingCode] = useState(false);

  // Alert dialogs
  const [deleteCompanyDialog, setDeleteCompanyDialog] = useState<string | null>(null);
  const [deleteUserDialog, setDeleteUserDialog] = useState<string | null>(null);
  const [reassignAdminDialog, setReassignAdminDialog] = useState<{userId: string, currentRole: string} | null>(null);

  // User management dialogs
  const [manageUserDialog, setManageUserDialog] = useState<any>(null);
  const [manageUserForm, setManageUserForm] = useState({
    action: 'reassign', // 'reassign' or 'change_role'
    companyId: '',
    role: 'STUDENT'
  });
  const [adminReplacementDialog, setAdminReplacementDialog] = useState<{
    adminToDelete: any,
    availableReplacements: any[]
  } | null>(null);
  const [selectedReplacementAdmin, setSelectedReplacementAdmin] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsRes, companiesRes, usersRes, modulesRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/companies'),
        fetch('/api/admin/users'),
        fetch('/api/admin/modules')
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      if (companiesRes.ok) {
        const companiesData = await companiesRes.json();
        setCompanies(companiesData);
        // Keep selectedCompany in sync with fresh data
        setSelectedCompany((prev: any) => {
          if (!prev) return companiesData.length > 0 ? companiesData[0] : null;
          return companiesData.find((c: any) => c.id === prev.id) ?? (companiesData.length > 0 ? companiesData[0] : null);
        });
      }

      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(usersData);
      }

      if (modulesRes.ok) {
        const modulesData = await modulesRes.json();
        setModules(modulesData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({ title: 'Error', description: 'Failed to load data', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCompany = async () => {
    if (!companyForm.companyName || !companyForm.companyCode) {
      toast({ title: 'Error', description: 'Company name and code are required', variant: 'destructive' });
      return;
    }

    if (!companyForm.adminName || !companyForm.adminEmail || !companyForm.adminPassword) {
      toast({ title: 'Error', description: 'Admin details are required', variant: 'destructive' });
      return;
    }

    if (companyForm.adminPassword.length < 8) {
      toast({ title: 'Error', description: 'Password must be at least 8 characters', variant: 'destructive' });
      return;
    }

    try {
      const res = await fetch('/api/admin/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(companyForm)
      });

      if (res.ok) {
        toast({ title: 'Success', description: 'Company and admin created successfully' });
        setIsCompanyDialogOpen(false);
        setCompanyForm({ companyName: '', companyCode: '', adminName: '', adminEmail: '', adminPassword: '' });
        fetchData();
      } else {
        const error = await res.json();
        toast({ title: 'Error', description: error.error || 'Failed to create company', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to create company', variant: 'destructive' });
    }
  };

  const handleUpdateCompanyName = async (companyId: string, newName: string) => {
    if (!newName.trim()) {
      toast({ title: 'Error', description: 'Company name cannot be empty', variant: 'destructive' });
      return;
    }

    try {
      const company = companies.find(c => c.id === companyId);
      const res = await fetch(`/api/admin/companies/${companyId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: newName,
          companyCode: company?.companyCode,
          isPublic: company?.isPublic || false
        })
      });

      if (res.ok) {
        toast({ title: 'Success', description: 'Company name updated successfully' });
        fetchData();
      } else {
        const error = await res.json();
        toast({ title: 'Error', description: error.error || 'Failed to update company', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update company', variant: 'destructive' });
    }
  };

  const handleDeleteCompany = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/companies/${id}`, { method: 'DELETE' });

      if (res.ok) {
        toast({ title: 'Success', description: 'Company deleted successfully' });
        setDeleteCompanyDialog(null);
        setSelectedCompany(null);
        fetchData();
      } else {
        const error = await res.json();
        toast({ title: 'Error', description: error.error || 'Failed to delete company', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete company', variant: 'destructive' });
    }
  };

  const handleUpdateUserRole = async (userId: string, newRole: string, currentRole: string) => {
    if (currentRole === 'COMPANY_ADMIN' || newRole === 'COMPANY_ADMIN') {
      setReassignAdminDialog({ userId, currentRole });
      return;
    }
    await executeRoleUpdate(userId, newRole);
  };

  const executeRoleUpdate = async (userId: string, newRole: string) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole })
      });

      if (res.ok) {
        toast({ title: 'Success', description: 'User role updated successfully' });
        setReassignAdminDialog(null);
        fetchData();
      } else {
        const error = await res.json();
        toast({ title: 'Error', description: error.error || 'Failed to update role', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update role', variant: 'destructive' });
    }
  };

  const handleAssignCompany = async (userId: string, companyId: string) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}/company`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyId: companyId || null })
      });

      if (res.ok) {
        toast({ title: 'Success', description: 'Company assignment updated successfully' });
        fetchData();
      } else {
        const error = await res.json();
        toast({ title: 'Error', description: error.error || 'Failed to assign company', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to assign company', variant: 'destructive' });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const user = users.find(u => u.id === userId);

      if (user?.role === 'COMPANY_ADMIN' && user.companyId) {
        const companyAdmins = users.filter(u =>
          u.companyId === user.companyId &&
          u.role === 'COMPANY_ADMIN'
        );

        if (companyAdmins.length <= 1) {
          const availableReplacements = users.filter(u =>
            u.companyId === user.companyId &&
            u.role === 'STUDENT' &&
            u.id !== userId
          );

          if (availableReplacements.length === 0) {
            toast({
              title: 'Cannot Delete',
              description: 'Cannot delete the last admin without any users to replace them. Please add more users to this company first.',
              variant: 'destructive'
            });
            setDeleteUserDialog(null);
            return;
          }

          setAdminReplacementDialog({
            adminToDelete: user,
            availableReplacements
          });
          setDeleteUserDialog(null);
          return;
        }
      }

      const res = await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' });

      if (res.ok) {
        toast({ title: 'Success', description: 'User deleted successfully' });
        setDeleteUserDialog(null);
        fetchData();
      } else {
        const error = await res.json();
        toast({ title: 'Error', description: error.error || 'Failed to delete user', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete user', variant: 'destructive' });
    }
  };

  const handleConfirmAdminReplacement = async () => {
    if (!adminReplacementDialog || !selectedReplacementAdmin) {
      toast({ title: 'Error', description: 'Please select a replacement admin', variant: 'destructive' });
      return;
    }

    try {
      const res = await fetch(
        `/api/admin/users/${adminReplacementDialog.adminToDelete.id}?replacementAdminId=${selectedReplacementAdmin}`,
        { method: 'DELETE' }
      );

      if (res.ok) {
        toast({ title: 'Success', description: 'Admin deleted and replacement promoted successfully' });
        setAdminReplacementDialog(null);
        setSelectedReplacementAdmin('');
        fetchData();
      } else {
        const error = await res.json();
        toast({ title: 'Error', description: error.error || 'Failed to complete operation', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to complete operation', variant: 'destructive' });
    }
  };

  const openManageUserDialog = (user: any, action: 'reassign' | 'change_role' = 'reassign') => {
    setManageUserDialog(user);
    setManageUserForm({
      action,
      companyId: user.companyId || '',
      role: user.role
    });
  };

  const handleManageUser = async () => {
    if (!manageUserDialog) return;

    if (manageUserForm.action === 'reassign' && !manageUserForm.companyId) {
      toast({ title: 'Error', description: 'Please select a company', variant: 'destructive' });
      return;
    }

    try {
      const res = await fetch(`/api/admin/users/${manageUserDialog.id}/manage`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(manageUserForm)
      });

      if (res.ok) {
        const action = manageUserForm.action === 'reassign' ? 'reassigned' : 'role updated';
        toast({ title: 'Success', description: `User ${action} successfully` });
        setManageUserDialog(null);
        fetchData();
      } else {
        const error = await res.json();
        toast({ title: 'Error', description: error.error || 'Failed to update user', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update user', variant: 'destructive' });
    }
  };

  const handlePromoteToAdmin = async (userId: string) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}/manage`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'change_role',
          role: 'COMPANY_ADMIN'
        })
      });

      if (res.ok) {
        toast({ title: 'Success', description: 'User promoted to Company Admin' });
        fetchData();
      } else {
        const error = await res.json();
        toast({ title: 'Error', description: error.error || 'Failed to promote user', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to promote user', variant: 'destructive' });
    }
  };

  const handleUpdateModule = async () => {
    if (!editingModule) return;

    try {
      const res = await fetch(`/api/admin/modules/${editingModule.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(moduleForm)
      });

      if (res.ok) {
        toast({ title: 'Success', description: 'Module updated successfully' });
        setIsModuleDialogOpen(false);
        setEditingModule(null);
        setModuleForm({ title: '', description: '', content: '', youtubeUrl: '' });
        fetchData();
      } else {
        const error = await res.json();
        toast({ title: 'Error', description: error.error || 'Failed to update module', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update module', variant: 'destructive' });
    }
  };

  const handleExportCompanies = async () => {
    try {
      const res = await fetch('/api/admin/export/companies');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `companies-export-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      toast({ title: 'Success', description: 'Companies exported successfully' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to export companies', variant: 'destructive' });
    }
  };

  // ── Survey results ────────────────────────────────────────────────────────

  const fetchSurveyResults = async (companyId?: string, dateFrom?: string, dateTo?: string) => {
    setSurveyLoading(true);
    try {
      const params = new URLSearchParams();
      if (companyId && companyId !== 'all') params.set('companyId', companyId);
      if (dateFrom) params.set('dateFrom', dateFrom);
      if (dateTo) params.set('dateTo', dateTo);
      const res = await fetch(`/api/admin/survey-results?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setSurveyResults(data.results);
        setSurveyTotal(data.total);
      } else {
        toast({ title: 'Error', description: 'Failed to load survey results', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to load survey results', variant: 'destructive' });
    } finally {
      setSurveyLoading(false);
    }
  };

  const handleOpenSurveyModal = () => {
    setIsSurveyModalOpen(true);
    setExpandedRows(new Set());
    fetchSurveyResults(surveyFilterCompany, surveyFilterFrom, surveyFilterTo);
  };

  const handleSurveyFilter = () => {
    fetchSurveyResults(surveyFilterCompany, surveyFilterFrom, surveyFilterTo);
  };

  const handleExportSurveyCsv = () => {
    const params = new URLSearchParams({ format: 'csv' });
    if (surveyFilterCompany && surveyFilterCompany !== 'all') params.set('companyId', surveyFilterCompany);
    if (surveyFilterFrom) params.set('dateFrom', surveyFilterFrom);
    if (surveyFilterTo) params.set('dateTo', surveyFilterTo);
    window.location.href = `/api/admin/survey-results?${params.toString()}`;
  };

  const toggleExpandedRow = (id: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const LIKERT_LABEL: Record<number, string> = {
    1: 'Not at all',
    2: 'Slightly',
    3: 'Moderately',
    4: 'Very',
    5: 'Extremely',
  };

  // ── User Directory ────────────────────────────────────────────────────────

  const getFilteredDirectoryUsers = () => {
    return users.filter(u => {
      if (u.role === 'SUPER_ADMIN') return false;
      if (userDirFilterCompany !== 'all' && u.companyId !== userDirFilterCompany) return false;
      if (userDirFilterCode !== 'all') {
        if (u.signupCode !== userDirFilterCode) return false;
      }
      if (userDirFilterFrom) {
        if (new Date(u.createdAt) < new Date(userDirFilterFrom)) return false;
      }
      if (userDirFilterTo) {
        const to = new Date(userDirFilterTo);
        to.setHours(23, 59, 59, 999);
        if (new Date(u.createdAt) > to) return false;
      }
      return true;
    });
  };

  const handleExportUserDirectory = () => {
    const filtered = getFilteredDirectoryUsers();
    const headers = ['Name', 'Email', 'Role', 'Company', 'Enrollment Code', 'Joined Date'];
    const rows = filtered.map(u => [
      u.name || 'N/A',
      u.email,
      u.role,
      u.company?.companyName || 'No Company',
      u.signupCode || 'N/A',
      new Date(u.createdAt).toISOString().split('T')[0]
    ]);
    const escape = (v: string) => `"${String(v).replace(/"/g, '""')}"`;
    const csv = [headers, ...rows].map(row => row.map(escape).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `user-directory-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // ── Company Codes ─────────────────────────────────────────────────────────

  const handleAddCode = async () => {
    if (!newCodeInput.trim() || !selectedCompany) return;
    setAddingCode(true);
    try {
      const res = await fetch('/api/admin/company-codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyId: selectedCompany.id, code: newCodeInput.trim() })
      });
      if (res.ok) {
        toast({ title: 'Success', description: 'Enrollment code added' });
        setNewCodeInput('');
        fetchData();
      } else {
        const err = await res.json();
        toast({ title: 'Error', description: err.error || 'Failed to add code', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Error', description: 'Failed to add code', variant: 'destructive' });
    } finally {
      setAddingCode(false);
    }
  };

  const handleDeleteCode = async (codeId: string) => {
    try {
      const res = await fetch(`/api/admin/company-codes/${codeId}`, { method: 'DELETE' });
      if (res.ok) {
        toast({ title: 'Success', description: 'Code removed' });
        fetchData();
      } else {
        const err = await res.json();
        toast({ title: 'Error', description: err.error || 'Failed to remove code', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Error', description: 'Failed to remove code', variant: 'destructive' });
    }
  };

  // ── Helpers ───────────────────────────────────────────────────────────────

  const openCreateCompanyDialog = () => {
    setEditingCompany(null);
    setCompanyForm({ companyName: '', companyCode: '', adminName: '', adminEmail: '', adminPassword: '' });
    setIsCompanyDialogOpen(true);
  };

  const openEditModuleDialog = (module: any) => {
    setEditingModule(module);
    setModuleForm({
      title: module.title,
      description: module.description,
      content: module.content,
      youtubeUrl: module.youtubeUrl || ''
    });
    setIsModuleDialogOpen(true);
  };

  const getCompanyUsers = (companyId: string) => {
    return users.filter(u => u.companyId === companyId && u.role !== 'SUPER_ADMIN');
  };

  const getRoleBadge = (role: string) => {
    if (role === 'COMPANY_ADMIN') return <span className="px-2 py-0.5 text-xs rounded-full bg-orange-100 text-orange-700 font-medium">Admin</span>;
    if (role === 'STUDENT') return <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700 font-medium">Student</span>;
    return <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700 font-medium">{role}</span>;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 pt-24 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  const filteredDirectoryUsers = getFilteredDirectoryUsers();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 pt-24">
      <main className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Super Admin Dashboard</h1>
          <p className="text-gray-600">Manage all companies, admins, and users across the platform</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
              <Building2 className="h-5 w-5 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalCompanies}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Admins</CardTitle>
              <UserCog className="h-5 w-5 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalCompanyAdmins}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-5 w-5 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalStudents}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Management Tabs */}
        <Tabs defaultValue="companies" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="companies">Companies Overview</TabsTrigger>
            <TabsTrigger value="modules">Module Management</TabsTrigger>
            <TabsTrigger value="exports">Reports & Export</TabsTrigger>
          </TabsList>

          {/* Companies Tab */}
          <TabsContent value="companies" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl mb-1">Companies Overview</CardTitle>
                  <p className="text-sm text-gray-600">View and manage all companies and their enrollment codes</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleOpenSurveyModal}>
                    <ClipboardList className="h-4 w-4 mr-2" />
                    Survey Results
                  </Button>
                  <Button variant="outline" onClick={() => setIsUserDirectoryOpen(true)}>
                    <Users className="h-4 w-4 mr-2" />
                    User Directory
                  </Button>
                  <Button onClick={openCreateCompanyDialog} className="bg-orange-500 hover:bg-orange-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Company
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Company Selector */}
                <div className="space-y-2">
                  <Label>Select Company</Label>
                  <Select
                    value={selectedCompany?.id || "none"}
                    onValueChange={(value) => {
                      const company = companies.find(c => c.id === value);
                      setSelectedCompany(company);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue>
                        {selectedCompany ? (
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4" />
                            <span>{selectedCompany.companyName} ({getCompanyUsers(selectedCompany.id).length} users)</span>
                          </div>
                        ) : (
                          'Select a company'
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {companies.map((company) => (
                        <SelectItem key={company.id} value={company.id}>
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4" />
                            <span>{company.companyName} ({getCompanyUsers(company.id).length} users)</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedCompany && (
                  <>
                    {/* Company Actions */}
                    <div className="flex gap-3 pt-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          const newName = prompt('Enter new company name:', selectedCompany.companyName);
                          if (newName) {
                            handleUpdateCompanyName(selectedCompany.id, newName);
                          }
                        }}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Name
                      </Button>
                      <Button
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => setDeleteCompanyDialog(selectedCompany.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Company
                      </Button>
                    </div>

                    {/* Company Admins */}
                    {(() => {
                      const admins = users.filter(u => u.companyId === selectedCompany.id && u.role === 'COMPANY_ADMIN');
                      return (
                        <div className="space-y-3">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <UserCog className="h-5 w-5" />
                            Company Admins ({admins.length})
                          </h3>
                          {admins.length === 0 ? (
                            <p className="text-sm text-gray-500">No admins assigned to this company.</p>
                          ) : (
                            <div className="space-y-2">
                              {admins.map((admin: any) => (
                                <div key={admin.id} className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg">
                                  <div className="min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{admin.name || 'No name'}</p>
                                    <p className="text-xs text-gray-500 truncate">{admin.email}</p>
                                  </div>
                                  <div className="flex items-center gap-2 ml-3 shrink-0">
                                    <Link href={`/dashboard?emulating=true&companyId=${selectedCompany.id}&view=admin`}>
                                      <Button variant="outline" size="sm" className="h-7 text-xs">
                                        <LayoutDashboard className="h-3.5 w-3.5 mr-1" />
                                        Admin View
                                      </Button>
                                    </Link>
                                    <Link href={`/dashboard?emulating=true&companyId=${selectedCompany.id}&view=student`}>
                                      <Button variant="outline" size="sm" className="h-7 text-xs">
                                        <Eye className="h-3.5 w-3.5 mr-1" />
                                        Student View
                                      </Button>
                                    </Link>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    {/* Enrollment Codes */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Key className="h-5 w-5" />
                        Enrollment Codes ({selectedCompany.companyCodes?.length ?? 0})
                      </h3>
                      <p className="text-sm text-gray-500">
                        Students enter one of these codes at signup to join this company.
                      </p>
                      <div className="space-y-2">
                        {(selectedCompany.companyCodes ?? []).map((c: any) => (
                          <div key={c.id} className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg">
                            <code className="font-mono text-sm font-medium text-gray-800 tracking-wide">{c.code}</code>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-gray-400">
                                Added {new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700 h-7 px-2"
                                onClick={() => handleDeleteCode(c.id)}
                                title="Remove code"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        {(selectedCompany.companyCodes ?? []).length === 0 && (
                          <div className="text-sm text-gray-500 text-center py-4">
                            No enrollment codes yet.
                          </div>
                        )}
                      </div>
                      {/* Add code form */}
                      <div className="flex gap-2 pt-1">
                        <Input
                          value={newCodeInput}
                          onChange={e => setNewCodeInput(e.target.value.toUpperCase())}
                          placeholder="e.g., ACME2025B"
                          className="flex-1 font-mono text-sm"
                          onKeyDown={e => { if (e.key === 'Enter') handleAddCode(); }}
                        />
                        <Button
                          onClick={handleAddCode}
                          disabled={addingCode || !newCodeInput.trim()}
                          className="bg-orange-500 hover:bg-orange-600"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Code
                        </Button>
                      </div>
                    </div>
                  </>
                )}

                {!selectedCompany && companies.length > 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Select a company to view details
                  </div>
                )}

                {companies.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No companies yet. Create your first company to get started.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Modules Tab */}
          <TabsContent value="modules" className="space-y-4">
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle>Module Content Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Module #</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Video</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {modules.map((module) => (
                      <TableRow key={module.id}>
                        <TableCell className="font-medium">{module.moduleNumber}</TableCell>
                        <TableCell>{module.title}</TableCell>
                        <TableCell className="max-w-xs truncate">{module.description}</TableCell>
                        <TableCell>{module.youtubeUrl ? '✓' : '✗'}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Link href={`/module/${module.id}`}>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Button>
                            </Link>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openEditModuleDialog(module)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="exports" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Download className="h-5 w-5 mr-2 text-orange-500" />
                    Export User Data
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Download a comprehensive CSV report of all users including their roles, companies, and progress.
                  </p>
                  <Button onClick={() => setIsUserDirectoryOpen(true)} className="w-full bg-orange-500 hover:bg-orange-600">
                    <Users className="h-4 w-4 mr-2" />
                    Open User Directory
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Download className="h-5 w-5 mr-2 text-orange-500" />
                    Export Company Data
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Download a comprehensive CSV report of all companies including user counts and details.
                  </p>
                  <Button onClick={handleExportCompanies} className="w-full bg-orange-500 hover:bg-orange-600">
                    <Download className="h-4 w-4 mr-2" />
                    Export Companies CSV
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* ── Company Create Dialog ──────────────────────────────────────────── */}
        <Dialog open={isCompanyDialogOpen} onOpenChange={setIsCompanyDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">Create New Company</DialogTitle>
              <DialogDescription>
                Create a new company with an admin user and access code
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={companyForm.companyName}
                    onChange={(e) => setCompanyForm({ ...companyForm, companyName: e.target.value })}
                    placeholder="e.g., Acme Construction"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyCode">Initial Enrollment Code</Label>
                  <Input
                    id="companyCode"
                    value={companyForm.companyCode}
                    onChange={(e) => setCompanyForm({ ...companyForm, companyCode: e.target.value.toUpperCase() })}
                    placeholder="e.g., ACME2024"
                    className="font-mono"
                  />
                  <p className="text-sm text-gray-500">
                    Students use this code at signup to join this company. You can add more codes later.
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-semibold">Admin User Details</h3>
                <div className="space-y-2">
                  <Label htmlFor="adminName">Admin Full Name</Label>
                  <Input
                    id="adminName"
                    value={companyForm.adminName}
                    onChange={(e) => setCompanyForm({ ...companyForm, adminName: e.target.value })}
                    placeholder="e.g., John Smith"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminEmail">Admin Email</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={companyForm.adminEmail}
                    onChange={(e) => setCompanyForm({ ...companyForm, adminEmail: e.target.value })}
                    placeholder="admin@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminPassword">Admin Password</Label>
                  <Input
                    id="adminPassword"
                    type="password"
                    value={companyForm.adminPassword}
                    onChange={(e) => setCompanyForm({ ...companyForm, adminPassword: e.target.value })}
                    placeholder="Min 8 characters"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCompanyDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateCompany} className="bg-orange-500 hover:bg-orange-600">
                Create Company
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* ── Module Edit Dialog ─────────────────────────────────────────────── */}
        <Dialog open={isModuleDialogOpen} onOpenChange={setIsModuleDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Module Content</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Module Title</Label>
                <Input
                  id="title"
                  value={moduleForm.title}
                  onChange={(e) => setModuleForm({ ...moduleForm, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={moduleForm.description}
                  onChange={(e) => setModuleForm({ ...moduleForm, description: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="youtubeUrl">YouTube URL (optional)</Label>
                <Input
                  id="youtubeUrl"
                  value={moduleForm.youtubeUrl}
                  onChange={(e) => setModuleForm({ ...moduleForm, youtubeUrl: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content (Markdown supported)</Label>
                <Textarea
                  id="content"
                  value={moduleForm.content}
                  onChange={(e) => setModuleForm({ ...moduleForm, content: e.target.value })}
                  rows={12}
                  className="font-mono text-sm"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsModuleDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateModule} className="bg-orange-500 hover:bg-orange-600">
                Update Module
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* ── Delete Company Alert ───────────────────────────────────────────── */}
        <AlertDialog open={deleteCompanyDialog !== null} onOpenChange={() => setDeleteCompanyDialog(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Delete Company?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the company and all associated data.
                All users in this company will lose their company affiliation.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteCompanyDialog && handleDeleteCompany(deleteCompanyDialog)}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete Company
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* ── Delete User Alert ──────────────────────────────────────────────── */}
        <AlertDialog open={deleteUserDialog !== null} onOpenChange={() => setDeleteUserDialog(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Remove User?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the user and all their progress data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteUserDialog && handleDeleteUser(deleteUserDialog)}
                className="bg-red-600 hover:bg-red-700"
              >
                Remove User
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* ── Reassign Admin Alert ───────────────────────────────────────────── */}
        <AlertDialog open={reassignAdminDialog !== null} onOpenChange={() => setReassignAdminDialog(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Change Admin Role?
              </AlertDialogTitle>
              <AlertDialogDescription>
                {reassignAdminDialog?.currentRole === 'COMPANY_ADMIN'
                  ? 'Removing admin privileges will revoke this user\'s ability to manage their company. Are you sure you want to proceed?'
                  : 'Granting admin privileges will allow this user to manage their company and its users. Are you sure you want to proceed?'
                }
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (reassignAdminDialog) {
                    const newRole = reassignAdminDialog.currentRole === 'COMPANY_ADMIN' ? 'STUDENT' : 'COMPANY_ADMIN';
                    executeRoleUpdate(reassignAdminDialog.userId, newRole);
                  }
                }}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Confirm Change
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* ── User Management Dialog ─────────────────────────────────────────── */}
        <Dialog open={manageUserDialog !== null} onOpenChange={() => setManageUserDialog(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Manage User</DialogTitle>
              <DialogDescription>
                {manageUserDialog?.name || manageUserDialog?.email} - {manageUserDialog?.role}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Action</Label>
                <Select
                  value={manageUserForm.action}
                  onValueChange={(value: 'reassign' | 'change_role') =>
                    setManageUserForm({ ...manageUserForm, action: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reassign">Reassign to Different Company</SelectItem>
                    <SelectItem value="change_role">Change Role (Same Company)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {manageUserForm.action === 'reassign' && (
                <>
                  <div className="space-y-2">
                    <Label>Target Company</Label>
                    <Select
                      value={manageUserForm.companyId}
                      onValueChange={(value) =>
                        setManageUserForm({ ...manageUserForm, companyId: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a company" />
                      </SelectTrigger>
                      <SelectContent>
                        {companies.map((company) => (
                          <SelectItem key={company.id} value={company.id}>
                            {company.companyName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>New Role in Target Company</Label>
                    <Select
                      value={manageUserForm.role}
                      onValueChange={(value) =>
                        setManageUserForm({ ...manageUserForm, role: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="STUDENT">Student</SelectItem>
                        <SelectItem value="COMPANY_ADMIN">Company Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {manageUserForm.action === 'change_role' && (
                <div className="space-y-2">
                  <Label>New Role</Label>
                  <Select
                    value={manageUserForm.role}
                    onValueChange={(value) =>
                      setManageUserForm({ ...manageUserForm, role: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="STUDENT">Student</SelectItem>
                      <SelectItem value="COMPANY_ADMIN">Company Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setManageUserDialog(null)}>
                Cancel
              </Button>
              <Button onClick={handleManageUser} className="bg-orange-500 hover:bg-orange-600">
                Apply Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* ── Survey Results Modal ───────────────────────────────────────────── */}
        <Dialog open={isSurveyModalOpen} onOpenChange={setIsSurveyModalOpen}>
          <DialogContent className="max-w-5xl w-full max-h-[90vh] flex flex-col p-0 gap-0">
            <DialogHeader className="px-6 pt-6 pb-4 border-b shrink-0">
              <DialogTitle className="flex items-center gap-2 text-xl">
                <ClipboardList className="h-5 w-5 text-orange-500" />
                End of Course Survey Results
              </DialogTitle>
              <p className="text-sm text-gray-600 mt-1">
                {surveyLoading ? 'Loading...' : `${surveyTotal} response${surveyTotal !== 1 ? 's' : ''} found`}
              </p>
            </DialogHeader>

            <div className="px-6 py-4 border-b bg-gray-50 shrink-0">
              <div className="flex flex-wrap items-end gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-600">Company</label>
                  <Select
                    value={surveyFilterCompany}
                    onValueChange={(val) => {
                      setSurveyFilterCompany(val);
                      fetchSurveyResults(val, surveyFilterFrom, surveyFilterTo);
                    }}
                  >
                    <SelectTrigger className="w-48 h-9 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Companies</SelectItem>
                      {companies.map((c: any) => (
                        <SelectItem key={c.id} value={c.id}>{c.companyName}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-600">From</label>
                  <input
                    type="date"
                    value={surveyFilterFrom}
                    onChange={(e) => setSurveyFilterFrom(e.target.value)}
                    className="h-9 px-3 text-sm border border-gray-200 rounded-md bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-600">To</label>
                  <input
                    type="date"
                    value={surveyFilterTo}
                    onChange={(e) => setSurveyFilterTo(e.target.value)}
                    className="h-9 px-3 text-sm border border-gray-200 rounded-md bg-white"
                  />
                </div>
                <Button size="sm" onClick={handleSurveyFilter} className="bg-orange-500 hover:bg-orange-600 h-9">
                  <Filter className="h-3.5 w-3.5 mr-1.5" />
                  Apply Filters
                </Button>
                <Button size="sm" variant="outline" onClick={() => {
                  setSurveyFilterCompany('all');
                  setSurveyFilterFrom('');
                  setSurveyFilterTo('');
                  fetchSurveyResults();
                }} className="h-9">
                  Clear
                </Button>
              </div>
            </div>

            <div className="overflow-y-auto flex-1 px-6 py-4">
              {surveyLoading ? (
                <div className="flex items-center justify-center py-16 text-gray-500">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500 mr-3" />
                  Loading survey results...
                </div>
              ) : surveyResults.length === 0 ? (
                <div className="text-center py-16 text-gray-500">
                  No survey responses match the current filters.
                </div>
              ) : (
                <div className="space-y-2">
                  {surveyResults.map((r: any) => (
                    <div key={r.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        type="button"
                        onClick={() => toggleExpandedRow(r.id)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          {expandedRows.has(r.id)
                            ? <ChevronDown className="h-4 w-4 text-gray-400 shrink-0" />
                            : <ChevronRight className="h-4 w-4 text-gray-400 shrink-0" />
                          }
                          <div className="min-w-0">
                            <span className="font-medium text-sm text-gray-900 truncate">{r.userName}</span>
                            <span className="text-gray-400 mx-2 text-xs">·</span>
                            <span className="text-sm text-gray-600 truncate">{r.userEmail}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 shrink-0 ml-4">
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{r.companyName}</span>
                          <span className="text-xs text-gray-400">
                            {new Date(r.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                      </button>

                      {expandedRows.has(r.id) && (
                        <div className="border-t border-gray-100 bg-gray-50 px-6 py-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                            <div><span className="font-medium text-gray-700">Q1 – Overall Experience:</span><span className="ml-2 text-gray-600">{r.answers.q1OverallExperience} / 10</span></div>
                            <div><span className="font-medium text-gray-700">Q2 – Content Meaningfulness:</span><span className="ml-2 text-gray-600">{r.answers.q2ContentMeaningful} – {LIKERT_LABEL[r.answers.q2ContentMeaningful]}</span></div>
                            <div><span className="font-medium text-gray-700">Q3 – Module Cohesion:</span><span className="ml-2 text-gray-600">{r.answers.q3ModuleCohesion} – {LIKERT_LABEL[r.answers.q3ModuleCohesion]}</span></div>
                            <div><span className="font-medium text-gray-700">Q4 – Layout & Ease of Use:</span><span className="ml-2 text-gray-600">{'★'.repeat(r.answers.q4LayoutRating)}{'☆'.repeat(5 - r.answers.q4LayoutRating)} ({r.answers.q4LayoutRating}/5)</span></div>
                            <div><span className="font-medium text-gray-700">Q5 – Technical Issues:</span><span className="ml-2 text-gray-600">{r.answers.q5TechIssues ? 'Yes' : 'No'}</span></div>
                            {r.answers.q5TechIssues && (
                              <div className="md:col-span-2"><span className="font-medium text-gray-700">Q5 – Issue Details:</span><span className="ml-2 text-gray-600">{r.answers.q5TechDetails}</span></div>
                            )}
                            <div><span className="font-medium text-gray-700">Q6 – Video Effectiveness:</span><span className="ml-2 text-gray-600">{r.answers.q6VideoEffectiveness} – {LIKERT_LABEL[r.answers.q6VideoEffectiveness]}</span></div>
                            <div><span className="font-medium text-gray-700">Q7 – Most Useful Module:</span><span className="ml-2 text-gray-600">{r.answers.q7MostUsefulModule}</span></div>
                            <div><span className="font-medium text-gray-700">Q8 – Over-Processed Module:</span><span className="ml-2 text-gray-600">{r.answers.q8OverProcessedModule}</span></div>
                            <div><span className="font-medium text-gray-700">Q9 – Confidence:</span><span className="ml-2 text-gray-600">{r.answers.q9Confidence} / 10</span></div>
                            <div><span className="font-medium text-gray-700">Q10 – Relevancy:</span><span className="ml-2 text-gray-600">{r.answers.q10Relevancy} – {LIKERT_LABEL[r.answers.q10Relevancy]}</span></div>
                            <div><span className="font-medium text-gray-700">Q11 – NPS:</span><span className="ml-2 text-gray-600">{r.answers.q11Nps} / 10</span></div>
                            <div className="md:col-span-2">
                              <span className="font-medium text-gray-700">Q12 – Improvement Suggestion:</span>
                              <p className="mt-1 text-gray-600 bg-white border border-gray-200 rounded p-3 text-sm leading-relaxed">{r.answers.q12Improvement}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t bg-gray-50 shrink-0 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {surveyTotal} response{surveyTotal !== 1 ? 's' : ''} · CSV export includes all answers
              </p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsSurveyModalOpen(false)}>Close</Button>
                <Button
                  onClick={handleExportSurveyCsv}
                  disabled={surveyTotal === 0}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* ── User Directory Modal ───────────────────────────────────────────── */}
        <Dialog open={isUserDirectoryOpen} onOpenChange={setIsUserDirectoryOpen}>
          <DialogContent className="max-w-6xl w-full max-h-[90vh] flex flex-col p-0 gap-0">
            {/* Fixed header */}
            <DialogHeader className="px-6 pt-6 pb-4 border-b shrink-0">
              <DialogTitle className="flex items-center gap-2 text-xl">
                <Users className="h-5 w-5 text-orange-500" />
                User Directory
              </DialogTitle>
              <p className="text-sm text-gray-600 mt-1">
                {filteredDirectoryUsers.length} user{filteredDirectoryUsers.length !== 1 ? 's' : ''} shown
              </p>
            </DialogHeader>

            {/* Filters */}
            <div className="px-6 py-4 border-b bg-gray-50 shrink-0">
              <div className="flex flex-wrap items-end gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-600">Company</label>
                  <Select
                    value={userDirFilterCompany}
                    onValueChange={(val) => {
                      setUserDirFilterCompany(val);
                      setUserDirFilterCode('all');
                    }}
                  >
                    <SelectTrigger className="w-48 h-9 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Companies</SelectItem>
                      {companies.map((c: any) => (
                        <SelectItem key={c.id} value={c.id}>{c.companyName}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {userDirFilterCompany !== 'all' && (
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-600">Enrollment Code</label>
                    <Select value={userDirFilterCode} onValueChange={setUserDirFilterCode}>
                      <SelectTrigger className="w-44 h-9 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Codes</SelectItem>
                        {(companies.find((c: any) => c.id === userDirFilterCompany)?.companyCodes ?? []).map((c: any) => (
                          <SelectItem key={c.id} value={c.code}>
                            <code className="font-mono">{c.code}</code>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-600">Joined From</label>
                  <input
                    type="date"
                    value={userDirFilterFrom}
                    onChange={(e) => setUserDirFilterFrom(e.target.value)}
                    className="h-9 px-3 text-sm border border-gray-200 rounded-md bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-600">Joined To</label>
                  <input
                    type="date"
                    value={userDirFilterTo}
                    onChange={(e) => setUserDirFilterTo(e.target.value)}
                    className="h-9 px-3 text-sm border border-gray-200 rounded-md bg-white"
                  />
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setUserDirFilterCompany('all');
                    setUserDirFilterCode('all');
                    setUserDirFilterFrom('');
                    setUserDirFilterTo('');
                  }}
                  className="h-9"
                >
                  Clear
                </Button>
              </div>
            </div>

            {/* Scrollable table */}
            <div className="overflow-y-auto flex-1">
              {filteredDirectoryUsers.length === 0 ? (
                <div className="text-center py-16 text-gray-500">
                  No users match the current filters.
                </div>
              ) : (
                <Table>
                  <TableHeader className="sticky top-0 bg-white z-10">
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDirectoryUsers.map((u: any) => (
                      <TableRow key={u.id}>
                        <TableCell className="font-medium">{u.name || 'No name'}</TableCell>
                        <TableCell className="text-sm text-gray-600">{u.email}</TableCell>
                        <TableCell>{getRoleBadge(u.role)}</TableCell>
                        <TableCell className="text-sm text-gray-600">{u.company?.companyName || '—'}</TableCell>
                        <TableCell>
                          {u.signupCode
                            ? <code className="text-xs font-mono bg-gray-100 px-1.5 py-0.5 rounded">{u.signupCode}</code>
                            : <span className="text-xs text-gray-400">—</span>
                          }
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {new Date(u.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-1.5">
                            {u.role === 'STUDENT' && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePromoteToAdmin(u.id)}
                                className="border-green-300 text-green-600 hover:bg-green-50 h-7 text-xs"
                              >
                                <UserCog className="h-3.5 w-3.5 mr-1" />
                                Make Admin
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openManageUserDialog(u, 'reassign')}
                              className="h-7 text-xs"
                            >
                              Reassign
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setDeleteUserDialog(u.id)}
                              className="h-7 text-xs text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>

            {/* Fixed footer */}
            <div className="px-6 py-4 border-t bg-gray-50 shrink-0 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {filteredDirectoryUsers.length} user{filteredDirectoryUsers.length !== 1 ? 's' : ''} · filters applied
              </p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsUserDirectoryOpen(false)}>Close</Button>
                <Button
                  onClick={handleExportUserDirectory}
                  disabled={filteredDirectoryUsers.length === 0}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* ── Admin Replacement Dialog ───────────────────────────────────────── */}
        <Dialog open={adminReplacementDialog !== null} onOpenChange={() => {
          setAdminReplacementDialog(null);
          setSelectedReplacementAdmin('');
        }}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Select Replacement Admin
              </DialogTitle>
              <DialogDescription>
                {adminReplacementDialog?.adminToDelete?.name || adminReplacementDialog?.adminToDelete?.email} is the last admin of their company.
                You must select a replacement admin before deleting this user.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Select New Admin</Label>
                <Select
                  value={selectedReplacementAdmin}
                  onValueChange={setSelectedReplacementAdmin}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a user to promote" />
                  </SelectTrigger>
                  <SelectContent>
                    {adminReplacementDialog?.availableReplacements.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name || 'No name'} ({user.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">
                  This user will be promoted to Company Admin and can manage the company.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setAdminReplacementDialog(null);
                  setSelectedReplacementAdmin('');
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmAdminReplacement}
                className="bg-red-600 hover:bg-red-700"
                disabled={!selectedReplacementAdmin}
              >
                Delete Admin & Promote Replacement
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
