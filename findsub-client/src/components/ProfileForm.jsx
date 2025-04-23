// /components/ProfileForm.jsx

function ProfileForm({ user, onChange, onSave, onVerifyEmail, onVerifyPhone, status }) {
    return (
      <form onSubmit={onSave} className="space-y-4">
        <div>
          <label>Username</label>
          <input name="username" value={user.username || ''} onChange={onChange} className="w-full border p-2" />
        </div>
  
        <div>
          <label>Email</label>
          <input name="email" value={user.email || ''} onChange={onChange} className="w-full border p-2" />
          {user.emailVerified ? ' ✅' : ' ❌'}
          {!user.emailVerified && <button type="button" onClick={onVerifyEmail}>Verify Email</button>}
        </div>
  
        <div>
          <label>Phone Number</label>
          <input name="phoneNumber" value={user.phoneNumber || ''} onChange={onChange} className="w-full border p-2" />
          {user.phoneVerified ? ' ✅' : ' ❌'}
          {!user.phoneVerified && <button type="button" onClick={onVerifyPhone}>Verify Phone</button>}
        </div>
  
        <div>
          <label>Experience Level</label>
          <select name="experienceLevel" value={user.experienceLevel || 'Beginner'} onChange={onChange} className="w-full border p-2">
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
  
        <div>
          <label>Limits</label>
          <textarea name="limits" value={user.limits || ''} onChange={onChange} className="w-full border p-2" />
        </div>
  
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">Save Changes</button>
        {status && <p className="mt-2 text-sm">{status}</p>}
      </form>
    );
  }
  
  export default ProfileForm;
  