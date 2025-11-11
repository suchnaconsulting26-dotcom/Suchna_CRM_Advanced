const { useState, useEffect, useContext, createContext } = React;

// Initial Data
const initialData = {
  users: [
    { id: 1, name: "Raj Kumar", email: "admin@suchna.com", password: "admin123", role: "Admin", department: "Management", status: "Active", avatar: "RK" },
    { id: 2, name: "Priya Sharma", email: "priya@suchna.com", password: "user123", role: "Sales Manager", department: "Sales", status: "Active", avatar: "PS" },
    { id: 3, name: "Amit Patel", email: "amit@suchna.com", password: "user123", role: "Project Manager", department: "Projects", status: "Active", avatar: "AP" }
  ],
  services: [
    { id: 1, name: "Web Development", category: "Development", base_price: 50000, description: "Custom web applications and websites" },
    { id: 2, name: "Custom CRM-ERP", category: "Development", base_price: 150000, description: "Enterprise software solutions" },
    { id: 3, name: "Graphic Design", category: "Design", base_price: 15000, description: "Logo, branding, and visual design" },
    { id: 4, name: "Digital Marketing", category: "Marketing", base_price: 25000, description: "SEO, social media, and campaigns" }
  ],
  companies: [
    { id: 1, name: "TechStart India", industry: "IT/Software", email: "contact@techstart.com", phone: "9876543210", address: "Bangalore, India", service_type: "Web Development", status: "Active", total_value: 500000, created_at: "2025-01-15" },
    { id: 2, name: "RetailCorp Solutions", industry: "Retail", email: "info@retailcorp.com", phone: "9876543211", address: "Mumbai, India", service_type: "Custom CRM-ERP", status: "Active", total_value: 800000, created_at: "2025-02-20" },
    { id: 3, name: "DesignHub Studios", industry: "Creative", email: "hello@designhub.com", phone: "9876543212", address: "Delhi, India", service_type: "Graphic Design", status: "Active", total_value: 250000, created_at: "2025-03-10" },
    { id: 4, name: "MarketPro Agency", industry: "Marketing", email: "contact@marketpro.com", phone: "9876543213", address: "Pune, India", service_type: "Digital Marketing", status: "Active", total_value: 150000, created_at: "2025-04-05" },
    { id: 5, name: "FinTech Solutions", industry: "Finance", email: "info@fintech.com", phone: "9876543214", address: "Hyderabad, India", service_type: "Custom CRM-ERP", status: "Active", total_value: 600000, created_at: "2025-05-12" }
  ],
  contacts: [
    { id: 1, company_id: 1, first_name: "Rajesh", last_name: "Verma", email: "rajesh@techstart.com", phone: "9876543220", position: "CEO", notes: "" },
    { id: 2, company_id: 2, first_name: "Neha", last_name: "Gupta", email: "neha@retailcorp.com", phone: "9876543221", position: "CTO", notes: "" },
    { id: 3, company_id: 3, first_name: "Arun", last_name: "Singh", email: "arun@designhub.com", phone: "9876543222", position: "Creative Director", notes: "" },
    { id: 4, company_id: 4, first_name: "Priya", last_name: "Mehta", email: "priya@marketpro.com", phone: "9876543223", position: "Marketing Head", notes: "" },
    { id: 5, company_id: 5, first_name: "Vikram", last_name: "Reddy", email: "vikram@fintech.com", phone: "9876543224", position: "Product Manager", notes: "" }
  ],
  leads: [
    { id: 1, company_id: 1, contact_id: 1, service_type: "Web Development", estimated_value: 75000, stage: "Proposal", created_at: "2025-10-15", updated_at: "2025-11-05", notes: "Looking for e-commerce solution" },
    { id: 2, company_id: 2, contact_id: 2, service_type: "Custom CRM-ERP", estimated_value: 200000, stage: "Negotiation", created_at: "2025-10-20", updated_at: "2025-11-08", notes: "Needs inventory management" },
    { id: 3, company_id: 3, contact_id: 3, service_type: "Graphic Design", estimated_value: 50000, stage: "Inquiry", created_at: "2025-11-01", updated_at: "2025-11-01", notes: "Brand refresh required" },
    { id: 4, company_id: 4, contact_id: 4, service_type: "Digital Marketing", estimated_value: 30000, stage: "Proposal", created_at: "2025-11-05", updated_at: "2025-11-10", notes: "SEO and social media" },
    { id: 5, company_id: 5, contact_id: 5, service_type: "Custom CRM-ERP", estimated_value: 180000, stage: "Won", created_at: "2025-09-15", updated_at: "2025-10-20", notes: "Contract signed" },
    { id: 6, company_id: 1, contact_id: 1, service_type: "Digital Marketing", estimated_value: 40000, stage: "Inquiry", created_at: "2025-11-08", updated_at: "2025-11-08", notes: "Initial inquiry" },
    { id: 7, company_id: 2, contact_id: 2, service_type: "Web Development", estimated_value: 90000, stage: "Lost", created_at: "2025-09-01", updated_at: "2025-10-15", notes: "Went with competitor" },
    { id: 8, company_id: 3, contact_id: 3, service_type: "Web Development", estimated_value: 60000, stage: "Negotiation", created_at: "2025-10-25", updated_at: "2025-11-09", notes: "Portfolio website" },
    { id: 9, company_id: 4, contact_id: 4, service_type: "Graphic Design", estimated_value: 25000, stage: "Proposal", created_at: "2025-11-02", updated_at: "2025-11-07", notes: "Logo and collateral" },
    { id: 10, company_id: 5, contact_id: 5, service_type: "Web Development", estimated_value: 120000, stage: "Inquiry", created_at: "2025-11-09", updated_at: "2025-11-09", notes: "Dashboard application" }
  ],
  projects: [
    { id: 1, company_id: 1, name: "E-commerce Platform", service_type: "Web Development", status: "In Progress", start_date: "2025-10-15", end_date: "2025-12-15", budget: 75000, assigned_to_id: 3, created_at: "2025-10-15" },
    { id: 2, company_id: 2, name: "Inventory Management System", service_type: "Custom CRM-ERP", status: "Planning", start_date: "2025-11-15", end_date: "2026-02-15", budget: 200000, assigned_to_id: 3, created_at: "2025-11-01" },
    { id: 3, company_id: 3, name: "Brand Identity Design", service_type: "Graphic Design", status: "In Review", start_date: "2025-09-01", end_date: "2025-11-30", budget: 50000, assigned_to_id: 2, created_at: "2025-09-01" },
    { id: 4, company_id: 4, name: "Digital Marketing Campaign", service_type: "Digital Marketing", status: "In Progress", start_date: "2025-10-01", end_date: "2025-12-31", budget: 30000, assigned_to_id: 2, created_at: "2025-10-01" },
    { id: 5, company_id: 5, name: "Financial Dashboard", service_type: "Custom CRM-ERP", status: "Completed", start_date: "2025-07-01", end_date: "2025-10-30", budget: 180000, assigned_to_id: 3, created_at: "2025-07-01" }
  ],
  tasks: [
    { id: 1, project_id: 1, title: "Database schema design", description: "Design database for e-commerce", assignee_id: 3, status: "In Progress", due_date: "2025-11-20", priority: "High", created_at: "2025-10-15" },
    { id: 2, project_id: 1, title: "Frontend development", description: "Build React components", assignee_id: 3, status: "To Do", due_date: "2025-12-01", priority: "High", created_at: "2025-10-15" },
    { id: 3, project_id: 2, title: "Requirements gathering", description: "Collect all business requirements", assignee_id: 3, status: "In Progress", due_date: "2025-11-25", priority: "Critical", created_at: "2025-11-01" },
    { id: 4, project_id: 1, title: "Payment gateway integration", description: "Integrate Razorpay", assignee_id: 3, status: "To Do", due_date: "2025-12-10", priority: "Medium", created_at: "2025-10-20" },
    { id: 5, project_id: 3, title: "Logo design concepts", description: "Create 3 logo variations", assignee_id: 2, status: "In Review", due_date: "2025-11-15", priority: "High", created_at: "2025-09-01" },
    { id: 6, project_id: 3, title: "Brand guidelines document", description: "Document brand standards", assignee_id: 2, status: "Done", due_date: "2025-11-10", priority: "Medium", created_at: "2025-09-15" },
    { id: 7, project_id: 4, title: "SEO audit", description: "Complete website SEO audit", assignee_id: 2, status: "Done", due_date: "2025-10-15", priority: "High", created_at: "2025-10-01" },
    { id: 8, project_id: 4, title: "Social media calendar", description: "Plan content for Q4", assignee_id: 2, status: "In Progress", due_date: "2025-11-30", priority: "Medium", created_at: "2025-10-05" },
    { id: 9, project_id: 2, title: "System architecture design", description: "Design scalable architecture", assignee_id: 3, status: "To Do", due_date: "2025-11-30", priority: "Critical", created_at: "2025-11-01" },
    { id: 10, project_id: 1, title: "Product catalog setup", description: "Setup product data structure", assignee_id: 3, status: "In Progress", due_date: "2025-11-25", priority: "High", created_at: "2025-10-18" },
    { id: 11, project_id: 4, title: "Google Ads campaign", description: "Launch PPC campaign", assignee_id: 2, status: "To Do", due_date: "2025-12-01", priority: "Medium", created_at: "2025-10-10" },
    { id: 12, project_id: 3, title: "Marketing collateral", description: "Design brochures and flyers", assignee_id: 2, status: "In Review", due_date: "2025-11-20", priority: "Low", created_at: "2025-09-20" },
    { id: 13, project_id: 1, title: "Testing and QA", description: "Complete testing phase", assignee_id: 3, status: "To Do", due_date: "2025-12-12", priority: "Critical", created_at: "2025-10-15" },
    { id: 14, project_id: 2, title: "Database setup", description: "Configure production database", assignee_id: 3, status: "To Do", due_date: "2025-12-10", priority: "High", created_at: "2025-11-05" },
    { id: 15, project_id: 4, title: "Monthly performance report", description: "Generate analytics report", assignee_id: 2, status: "To Do", due_date: "2025-11-30", priority: "Medium", created_at: "2025-10-01" }
  ],
  invoices: [
    { id: 1, project_id: 1, company_id: 1, amount: 25000, due_date: "2025-11-25", status: "Pending", created_at: "2025-11-01", invoice_number: "INV-001" },
    { id: 2, project_id: 1, company_id: 1, amount: 50000, due_date: "2025-12-31", status: "Draft", created_at: "2025-11-05", invoice_number: "INV-002" },
    { id: 3, project_id: 5, company_id: 5, amount: 180000, due_date: "2025-11-10", status: "Paid", created_at: "2025-10-15", invoice_number: "INV-003" },
    { id: 4, project_id: 3, company_id: 3, amount: 30000, due_date: "2025-11-05", status: "Overdue", created_at: "2025-10-01", invoice_number: "INV-004" },
    { id: 5, project_id: 4, company_id: 4, amount: 15000, due_date: "2025-11-20", status: "Pending", created_at: "2025-10-25", invoice_number: "INV-005" }
  ],
  activities: [
    { id: 1, user_id: 2, entity_type: "Lead", entity_id: 1, action: "Created new lead", timestamp: "2025-11-10T10:30:00" },
    { id: 2, user_id: 3, entity_type: "Task", entity_id: 1, action: "Updated task status to In Progress", timestamp: "2025-11-10T14:15:00" },
    { id: 3, user_id: 1, entity_type: "Project", entity_id: 1, action: "Created new project", timestamp: "2025-11-09T09:00:00" },
    { id: 4, user_id: 2, entity_type: "Invoice", entity_id: 1, action: "Sent invoice to client", timestamp: "2025-11-09T11:30:00" },
    { id: 5, user_id: 3, entity_type: "Task", entity_id: 6, action: "Completed task", timestamp: "2025-11-08T16:45:00" },
    { id: 6, user_id: 2, entity_type: "Lead", entity_id: 4, action: "Moved lead to Proposal stage", timestamp: "2025-11-08T13:20:00" },
    { id: 7, user_id: 1, entity_type: "Company", entity_id: 5, action: "Added new company", timestamp: "2025-11-07T10:00:00" },
    { id: 8, user_id: 3, entity_type: "Project", entity_id: 5, action: "Marked project as completed", timestamp: "2025-11-06T17:30:00" }
  ]
};

// Context
const AppContext = createContext();

function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [data, setData] = useState(initialData);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const login = (email, password) => {
    const user = data.users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      showToast(`Welcome back, ${user.name}!`, 'success');
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Logged out successfully', 'info');
  };

  const addActivity = (entity_type, entity_id, action) => {
    const newActivity = {
      id: data.activities.length + 1,
      user_id: currentUser.id,
      entity_type,
      entity_id,
      action,
      timestamp: new Date().toISOString()
    };
    setData(prev => ({ ...prev, activities: [newActivity, ...prev.activities] }));
  };

  const addCompany = (company) => {
    const newCompany = { ...company, id: data.companies.length + 1, created_at: new Date().toISOString().split('T')[0] };
    setData(prev => ({ ...prev, companies: [...prev.companies, newCompany] }));
    addActivity('Company', newCompany.id, 'Created new company');
    showToast('Company added successfully', 'success');
    return newCompany;
  };

  const updateCompany = (id, updates) => {
    setData(prev => ({
      ...prev,
      companies: prev.companies.map(c => c.id === id ? { ...c, ...updates } : c)
    }));
    addActivity('Company', id, 'Updated company');
    showToast('Company updated successfully', 'success');
  };

  const deleteCompany = (id) => {
    setData(prev => ({ ...prev, companies: prev.companies.filter(c => c.id !== id) }));
    showToast('Company deleted successfully', 'success');
  };

  const addContact = (contact) => {
    const newContact = { ...contact, id: data.contacts.length + 1 };
    setData(prev => ({ ...prev, contacts: [...prev.contacts, newContact] }));
    addActivity('Contact', newContact.id, 'Created new contact');
    showToast('Contact added successfully', 'success');
    return newContact;
  };

  const updateContact = (id, updates) => {
    setData(prev => ({
      ...prev,
      contacts: prev.contacts.map(c => c.id === id ? { ...c, ...updates } : c)
    }));
    showToast('Contact updated successfully', 'success');
  };

  const deleteContact = (id) => {
    setData(prev => ({ ...prev, contacts: prev.contacts.filter(c => c.id !== id) }));
    showToast('Contact deleted successfully', 'success');
  };

  const addLead = (lead) => {
    const newLead = { 
      ...lead, 
      id: data.leads.length + 1, 
      created_at: new Date().toISOString().split('T')[0],
      updated_at: new Date().toISOString().split('T')[0]
    };
    setData(prev => ({ ...prev, leads: [...prev.leads, newLead] }));
    addActivity('Lead', newLead.id, 'Created new lead');
    showToast('Lead added successfully', 'success');
    return newLead;
  };

  const updateLead = (id, updates) => {
    setData(prev => ({
      ...prev,
      leads: prev.leads.map(l => l.id === id ? { ...l, ...updates, updated_at: new Date().toISOString().split('T')[0] } : l)
    }));
    if (updates.stage) {
      addActivity('Lead', id, `Moved lead to ${updates.stage} stage`);
    }
    showToast('Lead updated successfully', 'success');
  };

  const deleteLead = (id) => {
    setData(prev => ({ ...prev, leads: prev.leads.filter(l => l.id !== id) }));
    showToast('Lead deleted successfully', 'success');
  };

  const addProject = (project) => {
    const newProject = { ...project, id: data.projects.length + 1, created_at: new Date().toISOString().split('T')[0] };
    setData(prev => ({ ...prev, projects: [...prev.projects, newProject] }));
    addActivity('Project', newProject.id, 'Created new project');
    showToast('Project added successfully', 'success');
    return newProject;
  };

  const updateProject = (id, updates) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, ...updates } : p)
    }));
    addActivity('Project', id, 'Updated project');
    showToast('Project updated successfully', 'success');
  };

  const deleteProject = (id) => {
    setData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
    showToast('Project deleted successfully', 'success');
  };

  const addTask = (task) => {
    const newTask = { ...task, id: data.tasks.length + 1, created_at: new Date().toISOString().split('T')[0] };
    setData(prev => ({ ...prev, tasks: [...prev.tasks, newTask] }));
    addActivity('Task', newTask.id, 'Created new task');
    showToast('Task added successfully', 'success');
    return newTask;
  };

  const updateTask = (id, updates) => {
    setData(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => t.id === id ? { ...t, ...updates } : t)
    }));
    if (updates.status) {
      addActivity('Task', id, `Updated task status to ${updates.status}`);
    }
    showToast('Task updated successfully', 'success');
  };

  const deleteTask = (id) => {
    setData(prev => ({ ...prev, tasks: prev.tasks.filter(t => t.id !== id) }));
    showToast('Task deleted successfully', 'success');
  };

  const addInvoice = (invoice) => {
    const newInvoice = { 
      ...invoice, 
      id: data.invoices.length + 1, 
      created_at: new Date().toISOString().split('T')[0],
      invoice_number: `INV-${String(data.invoices.length + 1).padStart(3, '0')}`
    };
    setData(prev => ({ ...prev, invoices: [...prev.invoices, newInvoice] }));
    addActivity('Invoice', newInvoice.id, 'Created new invoice');
    showToast('Invoice added successfully', 'success');
    return newInvoice;
  };

  const updateInvoice = (id, updates) => {
    setData(prev => ({
      ...prev,
      invoices: prev.invoices.map(i => i.id === id ? { ...i, ...updates } : i)
    }));
    addActivity('Invoice', id, 'Updated invoice');
    showToast('Invoice updated successfully', 'success');
  };

  const deleteInvoice = (id) => {
    setData(prev => ({ ...prev, invoices: prev.invoices.filter(i => i.id !== id) }));
    showToast('Invoice deleted successfully', 'success');
  };

  const value = {
    currentUser,
    data,
    login,
    logout,
    showToast,
    addCompany,
    updateCompany,
    deleteCompany,
    addContact,
    updateContact,
    deleteContact,
    addLead,
    updateLead,
    deleteLead,
    addProject,
    updateProject,
    deleteProject,
    addTask,
    updateTask,
    deleteTask,
    addInvoice,
    updateInvoice,
    deleteInvoice
  };

  return (
    <AppContext.Provider value={value}>
      {children}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          <span>{toast.message}</span>
        </div>
      )}
    </AppContext.Provider>
  );
}

function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}

// Login Component
function Login() {
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!login(email, password)) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Suchna Consulting</h1>
          <p>CRM System</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@suchna.com"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        <div style={{ marginTop: '16px', fontSize: '12px', color: 'var(--color-text-secondary)', textAlign: 'center' }}>
          Demo: admin@suchna.com / admin123
        </div>
      </div>
    </div>
  );
}

// Dashboard Component
function Dashboard() {
  const { data, currentUser } = useApp();
  const [revenueChart, setRevenueChart] = useState(null);
  const [pipelineChart, setPipelineChart] = useState(null);

  useEffect(() => {
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx && !revenueChart) {
      const chart = new Chart(revenueCtx, {
        type: 'line',
        data: {
          labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
          datasets: [{
            label: 'Revenue',
            data: [120000, 150000, 180000, 210000, 250000],
            borderColor: '#21808D',
            backgroundColor: 'rgba(33, 128, 141, 0.1)',
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
      setRevenueChart(chart);
    }

    // Pipeline Chart
    const pipelineCtx = document.getElementById('pipelineChart');
    if (pipelineCtx && !pipelineChart) {
      const stages = ['Inquiry', 'Proposal', 'Negotiation', 'Won', 'Lost'];
      const counts = stages.map(stage => data.leads.filter(l => l.stage === stage).length);
      
      const chart = new Chart(pipelineCtx, {
        type: 'doughnut',
        data: {
          labels: stages,
          datasets: [{
            data: counts,
            backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F', '#DB4545']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom' }
          }
        }
      });
      setPipelineChart(chart);
    }

    return () => {
      if (revenueChart) revenueChart.destroy();
      if (pipelineChart) pipelineChart.destroy();
    };
  }, []);

  const totalRevenue = data.invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.amount, 0);
  const activeProjects = data.projects.filter(p => p.status === 'In Progress').length;
  const pendingInvoices = data.invoices.filter(i => i.status === 'Pending' || i.status === 'Overdue').length;
  const pipelineValue = data.leads.filter(l => l.stage !== 'Lost' && l.stage !== 'Won').reduce((sum, l) => sum + l.estimated_value, 0);

  return (
    <div>
      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Total Revenue</span>
          </div>
          <div className="stat-card-value">₹{(totalRevenue / 1000).toFixed(0)}K</div>
          <div className="stat-card-change positive">↑ 12% from last month</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Active Clients</span>
          </div>
          <div className="stat-card-value">{data.companies.filter(c => c.status === 'Active').length}</div>
          <div className="stat-card-change positive">↑ 2 new this month</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Active Projects</span>
          </div>
          <div className="stat-card-value">{activeProjects}</div>
          <div className="stat-card-change">On track</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Pending Invoices</span>
          </div>
          <div className="stat-card-value">{pendingInvoices}</div>
          <div className="stat-card-change negative">Needs attention</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Pipeline Value</span>
          </div>
          <div className="stat-card-value">₹{(pipelineValue / 1000).toFixed(0)}K</div>
          <div className="stat-card-change positive">↑ 8% growth</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Revenue Trend</h3>
          </div>
          <div className="card-body">
            <div className="chart-container">
              <canvas id="revenueChart"></canvas>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Pipeline Breakdown</h3>
          </div>
          <div className="card-body">
            <div className="chart-container">
              <canvas id="pipelineChart"></canvas>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Upcoming Deadlines</h3>
          </div>
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Due Date</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                {data.tasks
                  .filter(t => t.status !== 'Done')
                  .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
                  .slice(0, 5)
                  .map(task => (
                    <tr key={task.id}>
                      <td>{task.title}</td>
                      <td>{new Date(task.due_date).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge badge-${task.priority === 'Critical' || task.priority === 'High' ? 'error' : 'warning'}`}>
                          {task.priority}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Recent Activities</h3>
          </div>
          <div className="card-body">
            <ul className="activities-list">
              {data.activities.slice(0, 6).map(activity => {
                const user = data.users.find(u => u.id === activity.user_id);
                return (
                  <li key={activity.id} className="activity-item">
                    <div className="activity-icon">📋</div>
                    <div className="activity-content">
                      <div className="activity-text">
                        <strong>{user?.name}</strong> {activity.action}
                      </div>
                      <div className="activity-time">
                        {new Date(activity.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Contacts Component
function Contacts() {
  const { data, addCompany, updateCompany, deleteCompany, addContact, updateContact, deleteContact } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('company');
  const [editItem, setEditItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterService, setFilterService] = useState('All');
  const [formData, setFormData] = useState({});

  const handleAdd = (type) => {
    setModalType(type);
    setEditItem(null);
    if (type === 'company') {
      setFormData({ name: '', industry: '', email: '', phone: '', address: '', service_type: 'Web Development', status: 'Active', total_value: 0 });
    } else {
      setFormData({ company_id: data.companies[0]?.id || 1, first_name: '', last_name: '', email: '', phone: '', position: '', notes: '' });
    }
    setShowModal(true);
  };

  const handleEdit = (item, type) => {
    setModalType(type);
    setEditItem(item);
    setFormData(item);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalType === 'company') {
      if (editItem) {
        updateCompany(editItem.id, formData);
      } else {
        addCompany(formData);
      }
    } else {
      if (editItem) {
        updateContact(editItem.id, formData);
      } else {
        addContact(formData);
      }
    }
    setShowModal(false);
  };

  const filteredCompanies = data.companies.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         c.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterService === 'All' || c.service_type === filterService;
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search companies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className="select" value={filterService} onChange={(e) => setFilterService(e.target.value)}>
          <option>All</option>
          {data.services.map(s => <option key={s.id}>{s.name}</option>)}
        </select>
        <button className="btn btn-primary" onClick={() => handleAdd('company')}>Add Company</button>
        <button className="btn btn-secondary" onClick={() => handleAdd('contact')}>Add Contact</button>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Companies</h3>
        </div>
        <div className="card-body">
          {filteredCompanies.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Industry</th>
                  <th>Service Type</th>
                  <th>Total Value</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompanies.map(company => (
                  <tr key={company.id}>
                    <td>
                      <div><strong>{company.name}</strong></div>
                      <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{company.email}</div>
                    </td>
                    <td>{company.industry}</td>
                    <td>{company.service_type}</td>
                    <td>₹{(company.total_value / 1000).toFixed(0)}K</td>
                    <td><span className="badge badge-success">{company.status}</span></td>
                    <td>
                      <button className="btn-icon" onClick={() => handleEdit(company, 'company')} title="Edit">✏️</button>
                      <button className="btn-icon" onClick={() => deleteCompany(company.id)} title="Delete">🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">🏢</div>
              <div className="empty-state-title">No companies found</div>
              <p>Add your first company to get started</p>
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Contacts</h3>
        </div>
        <div className="card-body">
          {data.contacts.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Position</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.contacts.map(contact => {
                  const company = data.companies.find(c => c.id === contact.company_id);
                  return (
                    <tr key={contact.id}>
                      <td><strong>{contact.first_name} {contact.last_name}</strong></td>
                      <td>{company?.name || 'N/A'}</td>
                      <td>{contact.position}</td>
                      <td>{contact.email}</td>
                      <td>{contact.phone}</td>
                      <td>
                        <button className="btn-icon" onClick={() => handleEdit(contact, 'contact')} title="Edit">✏️</button>
                        <button className="btn-icon" onClick={() => deleteContact(contact.id)} title="Delete">🗑️</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">👤</div>
              <div className="empty-state-title">No contacts found</div>
              <p>Add your first contact to get started</p>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editItem ? 'Edit' : 'Add'} {modalType === 'company' ? 'Company' : 'Contact'}</h3>
              <button className="btn-icon" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                {modalType === 'company' ? (
                  <>
                    <div className="form-group">
                      <label className="form-label">Company Name *</label>
                      <input className="form-input" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Industry</label>
                        <input className="form-input" value={formData.industry || ''} onChange={(e) => setFormData({...formData, industry: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Service Type</label>
                        <select className="form-input" value={formData.service_type || ''} onChange={(e) => setFormData({...formData, service_type: e.target.value})}>
                          {data.services.map(s => <option key={s.id}>{s.name}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-input" value={formData.email || ''} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Phone</label>
                        <input className="form-input" value={formData.phone || ''} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Address</label>
                      <input className="form-input" value={formData.address || ''} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Total Value (₹)</label>
                        <input type="number" className="form-input" value={formData.total_value || 0} onChange={(e) => setFormData({...formData, total_value: parseInt(e.target.value)})} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Status</label>
                        <select className="form-input" value={formData.status || 'Active'} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                          <option>Active</option>
                          <option>Inactive</option>
                        </select>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="form-group">
                      <label className="form-label">Company *</label>
                      <select className="form-input" value={formData.company_id || ''} onChange={(e) => setFormData({...formData, company_id: parseInt(e.target.value)})} required>
                        {data.companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">First Name *</label>
                        <input className="form-input" value={formData.first_name || ''} onChange={(e) => setFormData({...formData, first_name: e.target.value})} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Last Name *</label>
                        <input className="form-input" value={formData.last_name || ''} onChange={(e) => setFormData({...formData, last_name: e.target.value})} required />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-input" value={formData.email || ''} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Phone</label>
                        <input className="form-input" value={formData.phone || ''} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Position</label>
                      <input className="form-input" value={formData.position || ''} onChange={(e) => setFormData({...formData, position: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Notes</label>
                      <textarea className="form-input" value={formData.notes || ''} onChange={(e) => setFormData({...formData, notes: e.target.value})} />
                    </div>
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editItem ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Leads Component
function Leads() {
  const { data, addLead, updateLead, deleteLead } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editLead, setEditLead] = useState(null);
  const [formData, setFormData] = useState({});
  const [draggedLead, setDraggedLead] = useState(null);

  const stages = ['Inquiry', 'Proposal', 'Negotiation', 'Won', 'Lost'];

  const handleAdd = () => {
    setEditLead(null);
    setFormData({ 
      company_id: data.companies[0]?.id || 1, 
      contact_id: data.contacts[0]?.id || null,
      service_type: 'Web Development', 
      estimated_value: 0, 
      stage: 'Inquiry',
      notes: ''
    });
    setShowModal(true);
  };

  const handleEdit = (lead) => {
    setEditLead(lead);
    setFormData(lead);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editLead) {
      updateLead(editLead.id, formData);
    } else {
      addLead(formData);
    }
    setShowModal(false);
  };

  const handleDragStart = (lead) => {
    setDraggedLead(lead);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (stage) => {
    if (draggedLead && draggedLead.stage !== stage) {
      updateLead(draggedLead.id, { stage });
    }
    setDraggedLead(null);
  };

  const getLeadsByStage = (stage) => {
    return data.leads.filter(l => l.stage === stage);
  };

  return (
    <div>
      <div className="header-actions mb-16">
        <button className="btn btn-primary" onClick={handleAdd}>Add Lead</button>
      </div>

      <div className="kanban-board">
        {stages.map(stage => {
          const leads = getLeadsByStage(stage);
          return (
            <div 
              key={stage} 
              className="kanban-column"
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(stage)}
            >
              <div className="kanban-header">
                <span className="kanban-title">{stage}</span>
                <span className="kanban-count">{leads.length}</span>
              </div>
              {leads.map(lead => {
                const company = data.companies.find(c => c.id === lead.company_id);
                const contact = data.contacts.find(c => c.id === lead.contact_id);
                return (
                  <div
                    key={lead.id}
                    className="kanban-card"
                    draggable
                    onDragStart={() => handleDragStart(lead)}
                    onClick={() => handleEdit(lead)}
                  >
                    <div className="kanban-card-title">{company?.name || 'Unknown'}</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                      {lead.service_type}
                    </div>
                    <div className="kanban-card-meta">
                      <span>₹{(lead.estimated_value / 1000).toFixed(0)}K</span>
                      <span>{contact?.first_name || 'No contact'}</span>
                    </div>
                  </div>
                );
              })}
              {leads.length === 0 && (
                <div className="empty-state">
                  <p style={{ fontSize: '12px' }}>No leads</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editLead ? 'Edit' : 'Add'} Lead</h3>
              <button className="btn-icon" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Company *</label>
                  <select className="form-input" value={formData.company_id || ''} onChange={(e) => setFormData({...formData, company_id: parseInt(e.target.value)})} required>
                    {data.companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Contact</label>
                  <select className="form-input" value={formData.contact_id || ''} onChange={(e) => setFormData({...formData, contact_id: e.target.value ? parseInt(e.target.value) : null})}>
                    <option value="">Select contact</option>
                    {data.contacts.filter(c => c.company_id === formData.company_id).map(c => (
                      <option key={c.id} value={c.id}>{c.first_name} {c.last_name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Service Type *</label>
                    <select className="form-input" value={formData.service_type || ''} onChange={(e) => setFormData({...formData, service_type: e.target.value})} required>
                      {data.services.map(s => <option key={s.id}>{s.name}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Stage</label>
                    <select className="form-input" value={formData.stage || ''} onChange={(e) => setFormData({...formData, stage: e.target.value})}>
                      {stages.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Estimated Value (₹) *</label>
                  <input type="number" className="form-input" value={formData.estimated_value || 0} onChange={(e) => setFormData({...formData, estimated_value: parseInt(e.target.value)})} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Notes</label>
                  <textarea className="form-input" value={formData.notes || ''} onChange={(e) => setFormData({...formData, notes: e.target.value})} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                {editLead && <button type="button" className="btn btn-secondary" onClick={() => { deleteLead(editLead.id); setShowModal(false); }}>Delete</button>}
                <button type="submit" className="btn btn-primary">{editLead ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Projects Component
function Projects() {
  const { data, addProject, updateProject, deleteProject } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [formData, setFormData] = useState({});
  const [filterStatus, setFilterStatus] = useState('All');

  const handleAdd = () => {
    setEditProject(null);
    setFormData({
      company_id: data.companies[0]?.id || 1,
      name: '',
      service_type: 'Web Development',
      status: 'Planning',
      start_date: new Date().toISOString().split('T')[0],
      end_date: '',
      budget: 0,
      assigned_to_id: data.users[0]?.id || 1
    });
    setShowModal(true);
  };

  const handleEdit = (project) => {
    setEditProject(project);
    setFormData(project);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editProject) {
      updateProject(editProject.id, formData);
    } else {
      addProject(formData);
    }
    setShowModal(false);
  };

  const filteredProjects = filterStatus === 'All' 
    ? data.projects 
    : data.projects.filter(p => p.status === filterStatus);

  const statuses = ['Planning', 'In Progress', 'In Review', 'Completed', 'On Hold'];

  return (
    <div>
      <div className="filter-group">
        <select className="select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option>All</option>
          {statuses.map(s => <option key={s}>{s}</option>)}
        </select>
        <button className="btn btn-primary" onClick={handleAdd}>Add Project</button>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Projects</h3>
        </div>
        <div className="card-body">
          {filteredProjects.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Client</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th>Budget</th>
                  <th>Deadline</th>
                  <th>Manager</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map(project => {
                  const company = data.companies.find(c => c.id === project.company_id);
                  const manager = data.users.find(u => u.id === project.assigned_to_id);
                  return (
                    <tr key={project.id}>
                      <td><strong>{project.name}</strong></td>
                      <td>{company?.name || 'N/A'}</td>
                      <td>{project.service_type}</td>
                      <td>
                        <span className={`badge badge-${project.status === 'Completed' ? 'success' : project.status === 'In Progress' ? 'info' : 'warning'}`}>
                          {project.status}
                        </span>
                      </td>
                      <td>₹{(project.budget / 1000).toFixed(0)}K</td>
                      <td>{new Date(project.end_date).toLocaleDateString()}</td>
                      <td>{manager?.name || 'N/A'}</td>
                      <td>
                        <button className="btn-icon" onClick={() => handleEdit(project)} title="Edit">✏️</button>
                        <button className="btn-icon" onClick={() => deleteProject(project.id)} title="Delete">🗑️</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">📁</div>
              <div className="empty-state-title">No projects found</div>
              <p>Create your first project</p>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editProject ? 'Edit' : 'Add'} Project</h3>
              <button className="btn-icon" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Project Name *</label>
                  <input className="form-input" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Client *</label>
                    <select className="form-input" value={formData.company_id || ''} onChange={(e) => setFormData({...formData, company_id: parseInt(e.target.value)})} required>
                      {data.companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Service Type *</label>
                    <select className="form-input" value={formData.service_type || ''} onChange={(e) => setFormData({...formData, service_type: e.target.value})} required>
                      {data.services.map(s => <option key={s.id}>{s.name}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Status</label>
                    <select className="form-input" value={formData.status || ''} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                      {statuses.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Budget (₹)</label>
                    <input type="number" className="form-input" value={formData.budget || 0} onChange={(e) => setFormData({...formData, budget: parseInt(e.target.value)})} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Start Date</label>
                    <input type="date" className="form-input" value={formData.start_date || ''} onChange={(e) => setFormData({...formData, start_date: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">End Date</label>
                    <input type="date" className="form-input" value={formData.end_date || ''} onChange={(e) => setFormData({...formData, end_date: e.target.value})} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Assigned To</label>
                  <select className="form-input" value={formData.assigned_to_id || ''} onChange={(e) => setFormData({...formData, assigned_to_id: parseInt(e.target.value)})}>
                    {data.users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                {editProject && <button type="button" className="btn btn-secondary" onClick={() => { deleteProject(editProject.id); setShowModal(false); }}>Delete</button>}
                <button type="submit" className="btn btn-primary">{editProject ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Tasks Component
function Tasks() {
  const { data, addTask, updateTask, deleteTask } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [formData, setFormData] = useState({});
  const [draggedTask, setDraggedTask] = useState(null);

  const statuses = ['To Do', 'In Progress', 'In Review', 'Done'];

  const handleAdd = () => {
    setEditTask(null);
    setFormData({
      project_id: data.projects[0]?.id || 1,
      title: '',
      description: '',
      assignee_id: data.users[0]?.id || 1,
      status: 'To Do',
      due_date: '',
      priority: 'Medium'
    });
    setShowModal(true);
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setFormData(task);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editTask) {
      updateTask(editTask.id, formData);
    } else {
      addTask(formData);
    }
    setShowModal(false);
  };

  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (status) => {
    if (draggedTask && draggedTask.status !== status) {
      updateTask(draggedTask.id, { status });
    }
    setDraggedTask(null);
  };

  const getTasksByStatus = (status) => {
    return data.tasks.filter(t => t.status === status);
  };

  return (
    <div>
      <div className="header-actions mb-16">
        <button className="btn btn-primary" onClick={handleAdd}>Add Task</button>
      </div>

      <div className="kanban-board">
        {statuses.map(status => {
          const tasks = getTasksByStatus(status);
          return (
            <div 
              key={status} 
              className="kanban-column"
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(status)}
            >
              <div className="kanban-header">
                <span className="kanban-title">{status}</span>
                <span className="kanban-count">{tasks.length}</span>
              </div>
              {tasks.map(task => {
                const project = data.projects.find(p => p.id === task.project_id);
                const assignee = data.users.find(u => u.id === task.assignee_id);
                return (
                  <div
                    key={task.id}
                    className="kanban-card"
                    draggable
                    onDragStart={() => handleDragStart(task)}
                    onClick={() => handleEdit(task)}
                  >
                    <div className="kanban-card-title">{task.title}</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                      {project?.name || 'No project'}
                    </div>
                    <div className="kanban-card-meta">
                      <span className={`badge badge-${task.priority === 'Critical' || task.priority === 'High' ? 'error' : 'warning'}`} style={{ fontSize: '10px' }}>
                        {task.priority}
                      </span>
                      <span>{assignee?.avatar || '👤'}</span>
                    </div>
                  </div>
                );
              })}
              {tasks.length === 0 && (
                <div className="empty-state">
                  <p style={{ fontSize: '12px' }}>No tasks</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editTask ? 'Edit' : 'Add'} Task</h3>
              <button className="btn-icon" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Task Title *</label>
                  <input className="form-input" value={formData.title || ''} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea className="form-input" value={formData.description || ''} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Project *</label>
                    <select className="form-input" value={formData.project_id || ''} onChange={(e) => setFormData({...formData, project_id: parseInt(e.target.value)})} required>
                      {data.projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Assignee</label>
                    <select className="form-input" value={formData.assignee_id || ''} onChange={(e) => setFormData({...formData, assignee_id: parseInt(e.target.value)})}>
                      {data.users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Status</label>
                    <select className="form-input" value={formData.status || ''} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                      {statuses.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Priority</label>
                    <select className="form-input" value={formData.priority || ''} onChange={(e) => setFormData({...formData, priority: e.target.value})}>
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Critical</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Due Date</label>
                  <input type="date" className="form-input" value={formData.due_date || ''} onChange={(e) => setFormData({...formData, due_date: e.target.value})} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                {editTask && <button type="button" className="btn btn-secondary" onClick={() => { deleteTask(editTask.id); setShowModal(false); }}>Delete</button>}
                <button type="submit" className="btn btn-primary">{editTask ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Services Component
function Services() {
  const { data } = useApp();

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Our Services</h3>
        </div>
        <div className="card-body">
          <div className="dashboard-grid">
            {data.services.map(service => (
              <div key={service.id} className="stat-card">
                <div className="stat-card-title">{service.category}</div>
                <div style={{ fontSize: '20px', fontWeight: '600', margin: '12px 0' }}>{service.name}</div>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginBottom: '16px' }}>
                  {service.description}
                </div>
                <div className="stat-card-value">₹{(service.base_price / 1000).toFixed(0)}K</div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Starting price</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Service Performance</h3>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Active Projects</th>
                <th>Total Leads</th>
                <th>Conversion Rate</th>
                <th>Revenue Generated</th>
              </tr>
            </thead>
            <tbody>
              {data.services.map(service => {
                const projects = data.projects.filter(p => p.service_type === service.name);
                const leads = data.leads.filter(l => l.service_type === service.name);
                const wonLeads = leads.filter(l => l.stage === 'Won').length;
                const conversionRate = leads.length > 0 ? ((wonLeads / leads.length) * 100).toFixed(0) : 0;
                const revenue = projects.reduce((sum, p) => sum + p.budget, 0);
                return (
                  <tr key={service.id}>
                    <td><strong>{service.name}</strong></td>
                    <td>{projects.length}</td>
                    <td>{leads.length}</td>
                    <td>{conversionRate}%</td>
                    <td>₹{(revenue / 1000).toFixed(0)}K</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Invoices Component
function Invoices() {
  const { data, addInvoice, updateInvoice, deleteInvoice } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editInvoice, setEditInvoice] = useState(null);
  const [formData, setFormData] = useState({});

  const handleAdd = () => {
    setEditInvoice(null);
    setFormData({
      project_id: data.projects[0]?.id || 1,
      company_id: data.companies[0]?.id || 1,
      amount: 0,
      due_date: '',
      status: 'Draft'
    });
    setShowModal(true);
  };

  const handleEdit = (invoice) => {
    setEditInvoice(invoice);
    setFormData(invoice);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editInvoice) {
      updateInvoice(editInvoice.id, formData);
    } else {
      addInvoice(formData);
    }
    setShowModal(false);
  };

  const totalRevenue = data.invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.amount, 0);
  const pendingAmount = data.invoices.filter(i => i.status === 'Pending').reduce((sum, i) => sum + i.amount, 0);
  const overdueAmount = data.invoices.filter(i => i.status === 'Overdue').reduce((sum, i) => sum + i.amount, 0);

  return (
    <div>
      <div className="dashboard-grid mb-24">
        <div className="stat-card">
          <div className="stat-card-title">Total Revenue</div>
          <div className="stat-card-value">₹{(totalRevenue / 1000).toFixed(0)}K</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-title">Pending</div>
          <div className="stat-card-value">₹{(pendingAmount / 1000).toFixed(0)}K</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-title">Overdue</div>
          <div className="stat-card-value">₹{(overdueAmount / 1000).toFixed(0)}K</div>
        </div>
      </div>

      <div className="header-actions mb-16">
        <button className="btn btn-primary" onClick={handleAdd}>Create Invoice</button>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Invoices</h3>
        </div>
        <div className="card-body">
          {data.invoices.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Invoice #</th>
                  <th>Company</th>
                  <th>Project</th>
                  <th>Amount</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.invoices.map(invoice => {
                  const company = data.companies.find(c => c.id === invoice.company_id);
                  const project = data.projects.find(p => p.id === invoice.project_id);
                  return (
                    <tr key={invoice.id}>
                      <td><strong>{invoice.invoice_number}</strong></td>
                      <td>{company?.name || 'N/A'}</td>
                      <td>{project?.name || 'N/A'}</td>
                      <td>₹{invoice.amount.toLocaleString()}</td>
                      <td>{new Date(invoice.due_date).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge badge-${invoice.status === 'Paid' ? 'success' : invoice.status === 'Overdue' ? 'error' : invoice.status === 'Pending' ? 'warning' : 'info'}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn-icon" onClick={() => handleEdit(invoice)} title="Edit">✏️</button>
                        <button className="btn-icon" onClick={() => deleteInvoice(invoice.id)} title="Delete">🗑️</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">📄</div>
              <div className="empty-state-title">No invoices found</div>
              <p>Create your first invoice</p>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editInvoice ? 'Edit' : 'Create'} Invoice</h3>
              <button className="btn-icon" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Project *</label>
                    <select className="form-input" value={formData.project_id || ''} onChange={(e) => {
                      const projectId = parseInt(e.target.value);
                      const project = data.projects.find(p => p.id === projectId);
                      setFormData({...formData, project_id: projectId, company_id: project?.company_id || 1});
                    }} required>
                      {data.projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Company</label>
                    <select className="form-input" value={formData.company_id || ''} onChange={(e) => setFormData({...formData, company_id: parseInt(e.target.value)})} disabled>
                      {data.companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Amount (₹) *</label>
                    <input type="number" className="form-input" value={formData.amount || 0} onChange={(e) => setFormData({...formData, amount: parseInt(e.target.value)})} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Due Date *</label>
                    <input type="date" className="form-input" value={formData.due_date || ''} onChange={(e) => setFormData({...formData, due_date: e.target.value})} required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select className="form-input" value={formData.status || ''} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                    <option>Draft</option>
                    <option>Pending</option>
                    <option>Paid</option>
                    <option>Overdue</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                {editInvoice && <button type="button" className="btn btn-secondary" onClick={() => { deleteInvoice(editInvoice.id); setShowModal(false); }}>Delete</button>}
                <button type="submit" className="btn btn-primary">{editInvoice ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Team Component
function Team() {
  const { data } = useApp();

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Team Members</h3>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Department</th>
                <th>Status</th>
                <th>Active Projects</th>
                <th>Active Tasks</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map(user => {
                const projects = data.projects.filter(p => p.assigned_to_id === user.id && p.status !== 'Completed');
                const tasks = data.tasks.filter(t => t.assignee_id === user.id && t.status !== 'Done');
                return (
                  <tr key={user.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className="user-avatar">{user.avatar}</div>
                        <strong>{user.name}</strong>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.department}</td>
                    <td><span className="badge badge-success">{user.status}</span></td>
                    <td>{projects.length}</td>
                    <td>{tasks.length}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Team Workload</h3>
        </div>
        <div className="card-body">
          <div className="dashboard-grid">
            {data.users.map(user => {
              const tasks = data.tasks.filter(t => t.assignee_id === user.id);
              const completedTasks = tasks.filter(t => t.status === 'Done').length;
              const completionRate = tasks.length > 0 ? ((completedTasks / tasks.length) * 100).toFixed(0) : 0;
              return (
                <div key={user.id} className="stat-card">
                  <div className="stat-card-header">
                    <span className="stat-card-title">{user.name}</span>
                  </div>
                  <div className="stat-card-value">{tasks.length}</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Total tasks</div>
                  <div className="stat-card-change positive">{completionRate}% completion rate</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Reports Component
function Reports() {
  const { data } = useApp();

  const totalRevenue = data.invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.amount, 0);
  const totalProjects = data.projects.length;
  const completedProjects = data.projects.filter(p => p.status === 'Completed').length;
  const onTimeDelivery = totalProjects > 0 ? ((completedProjects / totalProjects) * 100).toFixed(0) : 0;
  
  const leadConversion = data.leads.filter(l => l.stage === 'Won').length;
  const totalLeads = data.leads.length;
  const conversionRate = totalLeads > 0 ? ((leadConversion / totalLeads) * 100).toFixed(0) : 0;

  const exportCSV = () => {
    const csvData = [
      ['Metric', 'Value'],
      ['Total Revenue', `₹${totalRevenue}`],
      ['Total Projects', totalProjects],
      ['Completed Projects', completedProjects],
      ['On-Time Delivery', `${onTimeDelivery}%`],
      ['Lead Conversion Rate', `${conversionRate}%`],
      ['Active Clients', data.companies.filter(c => c.status === 'Active').length]
    ];
    
    const csv = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'crm-report.csv';
    a.click();
  };

  return (
    <div>
      <div className="header-actions mb-16">
        <button className="btn btn-primary" onClick={exportCSV}>Export Report</button>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-card-title">Total Revenue</div>
          <div className="stat-card-value">₹{(totalRevenue / 1000).toFixed(0)}K</div>
          <div className="stat-card-change positive">↑ All time</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-title">Projects Completed</div>
          <div className="stat-card-value">{completedProjects}/{totalProjects}</div>
          <div className="stat-card-change">{onTimeDelivery}% completion rate</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-title">Lead Conversion</div>
          <div className="stat-card-value">{conversionRate}%</div>
          <div className="stat-card-change positive">{leadConversion} won leads</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-title">Active Clients</div>
          <div className="stat-card-value">{data.companies.filter(c => c.status === 'Active').length}</div>
          <div className="stat-card-change positive">Growing</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Revenue by Service Type</h3>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Projects</th>
                <th>Total Revenue</th>
                <th>Average Deal Size</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {data.services.map(service => {
                const projects = data.projects.filter(p => p.service_type === service.name);
                const revenue = projects.reduce((sum, p) => sum + p.budget, 0);
                const avgDeal = projects.length > 0 ? revenue / projects.length : 0;
                const percentage = totalRevenue > 0 ? ((revenue / totalRevenue) * 100).toFixed(1) : 0;
                return (
                  <tr key={service.id}>
                    <td><strong>{service.name}</strong></td>
                    <td>{projects.length}</td>
                    <td>₹{(revenue / 1000).toFixed(0)}K</td>
                    <td>₹{(avgDeal / 1000).toFixed(0)}K</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ flex: 1, height: '8px', background: 'var(--color-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${percentage}%`, height: '100%', background: 'var(--color-primary)' }}></div>
                        </div>
                        <span>{percentage}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Team Performance</h3>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Team Member</th>
                <th>Total Tasks</th>
                <th>Completed Tasks</th>
                <th>Completion Rate</th>
                <th>Active Projects</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map(user => {
                const tasks = data.tasks.filter(t => t.assignee_id === user.id);
                const completed = tasks.filter(t => t.status === 'Done').length;
                const rate = tasks.length > 0 ? ((completed / tasks.length) * 100).toFixed(0) : 0;
                const projects = data.projects.filter(p => p.assigned_to_id === user.id && p.status !== 'Completed');
                return (
                  <tr key={user.id}>
                    <td><strong>{user.name}</strong></td>
                    <td>{tasks.length}</td>
                    <td>{completed}</td>
                    <td>
                      <span className={`badge badge-${rate >= 70 ? 'success' : rate >= 50 ? 'warning' : 'error'}`}>
                        {rate}%
                      </span>
                    </td>
                    <td>{projects.length}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const { currentUser, logout } = useApp();
  const [currentView, setCurrentView] = useState('dashboard');

  if (!currentUser) {
    return <Login />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'contacts': return <Contacts />;
      case 'leads': return <Leads />;
      case 'projects': return <Projects />;
      case 'tasks': return <Tasks />;
      case 'services': return <Services />;
      case 'invoices': return <Invoices />;
      case 'team': return <Team />;
      case 'reports': return <Reports />;
      default: return <Dashboard />;
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'contacts', label: 'Contacts', icon: '👥' },
    { id: 'leads', label: 'Leads & Opportunities', icon: '💼' },
    { id: 'projects', label: 'Projects', icon: '📁' },
    { id: 'tasks', label: 'Tasks', icon: '✓' },
    { id: 'services', label: 'Services', icon: '🛠️' },
    { id: 'invoices', label: 'Invoices', icon: '📄' },
    { id: 'team', label: 'Team', icon: '👤' },
    { id: 'reports', label: 'Reports & Analytics', icon: '📈' }
  ];

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Suchna Consulting</h2>
        </div>
        <nav className="sidebar-nav">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${currentView === item.id ? 'active' : ''}`}
              onClick={() => setCurrentView(item.id)}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">{currentUser.avatar}</div>
            <div className="user-details">
              <div className="user-name">{currentUser.name}</div>
              <div className="user-role">{currentUser.role}</div>
            </div>
          </div>
          <button className="btn btn-secondary btn-small" onClick={logout} style={{ width: '100%' }}>Logout</button>
        </div>
      </div>
      <div className="main-content">
        <div className="header">
          <h1>{navItems.find(item => item.id === currentView)?.label || 'Dashboard'}</h1>
          <div className="header-actions">
            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </div>
        <div className="content">
          {renderView()}
        </div>
      </div>
    </div>
  );
}

// Root Render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
    <App />
  </AppProvider>
);