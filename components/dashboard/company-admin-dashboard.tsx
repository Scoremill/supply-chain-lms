'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, TrendingUp, Award, BookOpen, Activity, Download, Clock, AlertCircle, MessageCircle, Search, Trash2, RotateCcw, RefreshCw, Eye, Key, ChevronUp, ChevronDown } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface CompanyAdminDashboardProps {
  session: any;
  emulatedCompanyId?: string;
  emulatedCompanyName?: string;
}

export default function CompanyAdminDashboard({ session, emulatedCompanyId, emulatedCompanyName }: CompanyAdminDashboardProps) {
  const [stats, setStats] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [modules, setModules] = useState<any[]>([]);
  const [userStats, setUserStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [takeawaysModalOpen, setTakeawaysModalOpen] = useState(false);
  const [selectedTakeaways, setSelectedTakeaways] = useState<{ title: string; studentName: string; content: string }>({ title: '', studentName: '', content: '' });

  const companyId = emulatedCompanyId || session?.user?.companyId;
  const companyName = emulatedCompanyName || session?.user?.company?.name || 'Company';
  const isEmulating = !!emulatedCompanyId;

  useEffect(() => {
    fetchData();
  }, [companyId]);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        fetchData();
      }, 10000); // Refresh every 10 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh, companyId]);

  const fetchData = async () => {
    if (!companyId) return;

    try {
      // Add timestamp to prevent any client-side caching
      const timestamp = new Date().getTime();
      const [statsRes, studentsRes, modulesRes, userStatsRes] = await Promise.all([
        fetch(`/api/admin/company-stats?companyId=${companyId}&_t=${timestamp}`, { cache: 'no-store' }),
        fetch(`/api/admin/company-students?companyId=${companyId}&_t=${timestamp}`, { cache: 'no-store' }),
        fetch(`/api/admin/module-analytics?companyId=${companyId}&_t=${timestamp}`, { cache: 'no-store' }),
        fetch(`/api/admin/user-stats?companyId=${companyId}&_t=${timestamp}`, { cache: 'no-store' })
      ]);

      if (statsRes.ok) {
        const data = await statsRes.json();
        setStats(data);
      }

      if (studentsRes.ok) {
        const data = await studentsRes.json();
        console.log(`[Dashboard] Received ${data.length} students for companyId: ${companyId}`);
        console.log('[Dashboard] Students data:', data.map((s: any) => ({ email: s.email, progress: s.progress, progressPercent: s.progressPercent })));
        setStudents(data);
      }

      if (modulesRes.ok) {
        const data = await modulesRes.json();
        setModules(data);
      }

      if (userStatsRes.ok) {
        const data = await userStatsRes.json();
        setUserStats(data);
      }

      setLastRefresh(new Date());
      setLoading(false);
    } catch (error) {
      console.error('Error fetching company admin data:', error);
      toast({ title: 'Error', description: 'Failed to load data', variant: 'destructive' });
      setLoading(false);
    }
  };

  const handleExportStudents = async () => {
    try {
      const response = await fetch(`/api/admin/export-students?companyId=${companyId}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${companyName}-students-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast({ title: 'Success', description: 'Student list exported successfully' });
      } else {
        throw new Error('Export failed');
      }
    } catch (error) {
      console.error('Export error:', error);
      toast({ title: 'Error', description: 'Failed to export student list', variant: 'destructive' });
    }
  };

  const handlePurgeInactive = async () => {
    if (!confirm('Are you sure you want to purge users inactive for 365+ days? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch('/api/admin/purge-inactive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyId, days: 365 })
      });

      if (response.ok) {
        toast({ title: 'Success', description: 'Inactive users purged successfully' });
        fetchData();
      } else {
        throw new Error('Purge failed');
      }
    } catch (error) {
      console.error('Purge error:', error);
      toast({ title: 'Error', description: 'Failed to purge inactive users', variant: 'destructive' });
    }
  };

  const handleViewTakeaways = async (stat: any) => {
    try {
      // Fetch the student's written takeaways
      const response = await fetch(`/api/admin/user-takeaways?userId=${stat.userId}&moduleNumber=${stat.moduleNumber}`);
      if (!response.ok) {
        throw new Error('Failed to fetch takeaways');
      }
      
      const data = await response.json();
      
      setSelectedTakeaways({
        title: `Module ${stat.moduleNumber} Takeaways - ${stat.name}`,
        studentName: stat.name,
        content: data.takeaways || 'No takeaways submitted yet.'
      });
      setTakeawaysModalOpen(true);
    } catch (error) {
      console.error('Error fetching takeaways:', error);
      toast({ 
        title: 'Error', 
        description: 'Failed to load takeaways', 
        variant: 'destructive' 
      });
    }
  };

  const [codeFilter, setCodeFilter] = useState<string>('all');
  const [nameSortOrder, setNameSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredStudents = students
    .filter(s => {
      const matchesSearch =
        s.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCode = codeFilter === 'all' || s.signupCode === codeFilter;
      return matchesSearch && matchesCode;
    })
    .sort((a, b) => {
      const nameA = (a.name || '').toLowerCase();
      const nameB = (b.name || '').toLowerCase();
      return nameSortOrder === 'asc'
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });

  const filteredUserStats = userStats.filter(s =>
    s.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading || !stats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 pt-24 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 pt-24 pb-12">
      <main className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="bg-gray-900 rounded-lg p-3">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-orange-500">Admin Dashboard</h1>
                <p className="text-gray-600">Training Course Management</p>
              </div>
            </div>
            <Button
              onClick={() => {
                setLoading(true);
                fetchData();
              }}
              variant="outline"
              className="gap-2 text-blue-600 border-blue-300 hover:bg-blue-50"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh Data
            </Button>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border">
              <BookOpen className="h-4 w-4" />
              <span className="font-medium">{companyName}</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border">
              <Users className="h-4 w-4" />
              <span>{stats.company.totalUsers} users</span>
            </div>
            <div className="flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1.5 rounded-lg font-medium">
              <Key className="h-4 w-4" />
              <span>{(stats.company.companyCodes ?? [stats.company.companyCode]).length} enrollment code{(stats.company.companyCodes ?? [stats.company.companyCode]).length !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Students</CardTitle>
              <Users className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.totalStudents}</div>
              <p className="text-xs text-green-600 mt-1">+{stats.recentEnrollments} this month</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Students</CardTitle>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.activeStudents}</div>
              <p className="text-xs text-gray-600 mt-1">{stats.engagementRate}% engagement</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Completion Rate</CardTitle>
              <Activity className="h-5 w-5 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.completionRate}%</div>
              <p className="text-xs text-gray-600 mt-1">Average across all modules</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Certificates Issued</CardTitle>
              <Award className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.certificatesIssued}</div>
              <p className="text-xs text-gray-600 mt-1">Course completions</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white/70 backdrop-blur-sm border border-gray-200 shadow-sm">
            <TabsTrigger value="overview" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="students" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Students
            </TabsTrigger>
            <TabsTrigger value="modules" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Modules
            </TabsTrigger>
            <TabsTrigger value="user-stats" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              User Stats
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-500" />
                    <CardTitle>Recent Activity</CardTitle>
                  </div>
                  <p className="text-sm text-gray-600">Latest student enrollments and completions</p>
                </CardHeader>
                <CardContent>
                  {students.slice(0, 5).map((student: any) => (
                    <div key={student.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                      <div>
                        <div className="font-medium">{student.name || 'No name'}</div>
                        <div className="text-sm text-gray-600">{student.progress}/{student.totalModules} modules</div>
                      </div>
                      <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                        {student.status || 'inactive'}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Module Performance Indicators */}
              <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-orange-500" />
                    <CardTitle>Module Performance</CardTitle>
                  </div>
                  <p className="text-sm text-gray-600">Top and bottom performing modules</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {modules
                    .sort((a: any, b: any) => b.avgScore - a.avgScore)
                    .slice(0, 5)
                    .map((module: any, index: number) => (
                      <div key={module.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-semibold text-gray-900">Module {module.moduleNumber}</div>
                            <div className="text-xs text-gray-600">{module.title}</div>
                          </div>
                          <div className="text-lg font-bold text-gray-900">{module.avgScore}%</div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-orange-500 h-full transition-all duration-500"
                            style={{ width: `${module.avgScore}%` }}
                          />
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>

            {/* Student Progress Overview - Compact Metrics */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle>Student Progress Overview</CardTitle>
                <p className="text-sm text-gray-600">Detailed view of all enrolled students and their progress</p>
              </CardHeader>
              <CardContent>

                {/* Student Table */}
                <div className="border rounded-lg overflow-hidden bg-white">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold">Student</TableHead>
                        <TableHead className="font-semibold">Module Progress</TableHead>
                        <TableHead className="font-semibold">Last Quiz Score</TableHead>
                        <TableHead className="font-semibold">Avg Quiz Score</TableHead>
                        <TableHead className="font-semibold">Quiz Attempts</TableHead>
                        <TableHead className="font-semibold">Last Activity</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map((student: any) => (
                        <TableRow key={student.id} className="hover:bg-gray-50">
                          <TableCell>
                            <div className="font-medium text-gray-900">{student.name || 'No name'}</div>
                            <div className="text-sm text-gray-600">{student.email}</div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2">
                                <div className="text-sm font-semibold text-gray-900">{student.progress}/{student.totalModules}</div>
                                <Progress value={student.progressPercent} className="h-2 flex-1 max-w-[120px]" />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm font-medium text-gray-900">
                              {student.lastQuizScore != null ? `${Math.round(student.lastQuizScore)}%` : '-'}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm font-medium text-gray-900">
                              {student.avgScore ? `${student.avgScore}%` : '-'}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm font-medium text-gray-900">
                              {student.totalAttempts ?? 0}
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">
                            {student.lastActivity ? new Date(student.lastActivity).toLocaleDateString() : 'Never'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>All Registered Students</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">Complete list of user accounts and their module progress</p>
                  </div>
                  <Button onClick={handleExportStudents} variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export Student List
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <p className="text-sm text-gray-600">
                    Showing {filteredStudents.length} registered student{filteredStudents.length !== 1 ? 's' : ''}
                  </p>
                  {stats?.company?.companyCodes?.length > 0 && (
                    <Select value={codeFilter} onValueChange={(val) => { setCodeFilter(val); }}>
                      <SelectTrigger className="w-44 h-8 text-sm">
                        <SelectValue placeholder="All codes" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All codes</SelectItem>
                        {(stats.company.companyCodes as string[]).map((code) => (
                          <SelectItem key={code} value={code}>
                            <code className="font-mono">{code}</code>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  {codeFilter !== 'all' && (
                    <button
                      onClick={() => setCodeFilter('all')}
                      className="text-xs text-gray-500 underline hover:text-gray-700"
                    >
                      Clear filter
                    </button>
                  )}
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          <button
                            onClick={() => setNameSortOrder(nameSortOrder === 'asc' ? 'desc' : 'asc')}
                            className="flex items-center gap-1 hover:text-orange-600 transition-colors"
                          >
                            Student
                            {nameSortOrder === 'asc' ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </button>
                        </TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead>Registration</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Avg Score</TableHead>
                        <TableHead>Attempts</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Activity</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map((student: any) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div className="font-medium">{student.name || 'No name'}</div>
                            <div className="text-sm text-gray-600">{student.email}</div>
                          </TableCell>
                          <TableCell>
                            {student.signupCode
                              ? <code className="text-xs font-mono bg-gray-100 px-1.5 py-0.5 rounded">{student.signupCode}</code>
                              : <span className="text-xs text-gray-400">—</span>
                            }
                          </TableCell>
                          <TableCell>
                            {new Date(student.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-sm font-medium">{student.progress}/{student.totalModules}</div>
                              <Progress value={student.progressPercent} className="h-2" />
                              <div className="text-xs text-gray-600">{student.progressPercent}%</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {student.avgScore ? `${student.avgScore}%` : '-'}
                          </TableCell>
                          <TableCell>
                            {student.totalAttempts ?? 0}
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={student.status === 'active' ? 'default' : 'secondary'}
                              className={student.status === 'active' ? '' : 'bg-gray-200 text-gray-700'}
                            >
                              {student.status || 'inactive'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {student.lastActivity || 'Never'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Modules Tab */}
          <TabsContent value="modules" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle>Module Analytics</CardTitle>
                <p className="text-sm text-gray-600">Performance metrics for each training module</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {modules.map((module: any) => (
                  <div key={module.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">Module {module.moduleNumber}: {module.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {module.completionRate}%
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{module.enrolledCount} students enrolled</p>
                      </div>
                      <Link href={`/module/${module.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="ml-4"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Module
                        </Button>
                      </Link>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-green-700">{module.completionRate}%</div>
                        <div className="text-sm text-gray-600">Completion Rate</div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-blue-700">{module.avgScore}%</div>
                        <div className="text-sm text-gray-600">Average Score</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-purple-700">{module.avgTime}</div>
                        <div className="text-sm text-gray-600">Avg Time</div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Stats Tab */}
          <TabsContent value="user-stats" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <div>
                      <CardTitle>Time Spent Per Module (Minutes)</CardTitle>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <Badge variant="default" className="gap-1">
                          <Activity className="h-3 w-3" />
                          Live Updates
                        </Badge>
                        <span>
                          Detailed analytics of time each student spends in each module during active sessions • Updates every 10 seconds • Last refresh: {lastRefresh.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handlePurgeInactive}
                      className="text-red-600 hover:bg-red-50 gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Purge Inactive (365d+)
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setAutoRefresh(!autoRefresh)}
                      className={autoRefresh ? 'bg-blue-50 text-blue-600' : ''}
                    >
                      <RotateCcw className={`h-4 w-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
                      {autoRefresh ? 'Stop' : 'Start'} Auto-refresh
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search users by name or email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Module</TableHead>
                        <TableHead>Time Spent</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Takeaways</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUserStats.map((stat: any) => (
                        <TableRow key={stat.id}>
                          <TableCell className="font-medium">{stat.name || 'No name'}</TableCell>
                          <TableCell>{stat.email}</TableCell>
                          <TableCell>
                            <div className="font-medium">Module {stat.moduleNumber}</div>
                            <div className="text-xs text-gray-600">{stat.moduleTitle}</div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={stat.timeSpent > 30 ? 'default' : 'secondary'} className="gap-1">
                              <Clock className="h-3 w-3" />
                              {stat.timeSpent}min
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={stat.status === 'In Progress' ? 'default' : 'secondary'}
                              className={stat.status === 'In Progress' ? 'bg-blue-500' : ''}
                            >
                              {stat.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {stat.hasTakeaways ? (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleViewTakeaways(stat)}
                                className="text-orange-600 border-orange-600 hover:bg-orange-50"
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Insights */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-blue-900 mb-2">Insights</h4>
                      <div className="flex justify-between items-start gap-8 mb-2">
                        <div className="flex-1 text-center">
                          <div className="text-3xl font-bold text-green-700">
                            {userStats.filter((s: any) => s.timeSpent <= 30).length}
                          </div>
                          <div className="text-sm text-gray-600">Quick Sessions (≤30min)</div>
                        </div>
                        <div className="flex-1 text-center">
                          <div className="text-3xl font-bold text-orange-700">
                            {userStats.filter((s: any) => s.timeSpent > 30 && s.timeSpent <= 60).length}
                          </div>
                          <div className="text-sm text-gray-600">Moderate Sessions (31-60min)</div>
                        </div>
                        <div className="flex-1 text-center">
                          <div className="text-3xl font-bold text-red-700">
                            {userStats.filter((s: any) => s.timeSpent > 60).length}
                          </div>
                          <div className="text-sm text-gray-600">Long Sessions (&gt;60min)</div>
                        </div>
                      </div>
                      <p className="text-sm text-blue-800">
                        <strong>Note:</strong> Long sessions may indicate challenging content or areas where students need additional support.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Takeaways Modal */}
      <Dialog open={takeawaysModalOpen} onOpenChange={setTakeawaysModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Key Takeaways</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <pre className="whitespace-pre-wrap text-gray-700 font-sans text-sm leading-relaxed">
                {selectedTakeaways.content}
              </pre>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}